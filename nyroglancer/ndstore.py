from .intrusion import evaluate
from PIL import Image as PilImage
from StringIO import StringIO
from notebook.base.handlers import IPythonHandler
from tornado.escape import url_unescape
import binascii
import json
import math
import numpy as np
import random
import zlib

LEN_VOLUME_KEY=16

def create_key():

    return ''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789') for i in range(LEN_VOLUME_KEY)])

class Info(IPythonHandler):

    def get(self, cf_volume_key):

        cf = url_unescape(cf_volume_key[:-LEN_VOLUME_KEY])
        volume_key = cf_volume_key[-LEN_VOLUME_KEY:]

        volume_type = json.loads(evaluate(cf, "nyroglancer.volumes['%s'].vtype" % volume_key))
        is_segmentation = (volume_type == "segmentation")

        volume_size = json.loads(evaluate(cf, "list(nyroglancer.volumes['%s'].data.shape)" % volume_key))[::-1]
        resolution = json.loads(evaluate(cf, "nyroglancer.volumes['%s'].resolution" % volume_key))[::-1]
        chunk_size = json.loads(evaluate(cf, "nyroglancer.volumes['%s'].chunk_size" % volume_key))[::-1]
        num_chunks = np.prod([ int(math.ceil(volume_size[d]/chunk_size[d])) for d in range(3) ])

        if is_segmentation:
            channel_info = {
                "segmentation": {
                    "channel_type": "annotation",
                    # FIXME: neuroglancer does not support uint64 (at the moment),
                    # therefore we ship uint32 for now
                    "datatype": "uint32",
                    "exceptions": 0,
                    "propagate": 2,
                    "readonly": 1,
                    "resolution": 0,
                    "windowrange": [ 0, 0 ]
                }
            }
        else:
            channel_info = {
                "image": {
                    "channel_type": "image",
                    "datatype": "uint8",
                    "exceptions": 0,
                    "propagate": 2,
                    "readonly": 1,
                    "resolution": 0,
                    "windowrange": [ 0, 0 ]
                }
            }

        self.write(json.dumps({
            "channels": channel_info,
            "dataset": {
                "cube_dimension": {
                    "0": chunk_size
                },
                "description": "volume " + volume_key,
                "neariso_imagesize": {
                    "0": volume_size
                },
                "neariso_offset": {
                    "0": [ 0, 0, 0 ]
                },
                "neariso_scaledown": {
                    "0": 1
                },
                "neariso_voxelres": {
                    "0": resolution
                },
                "imagesize": {
                    "0": volume_size
                },
                "offset": {
                    "0": [ 0, 0, 0 ]
                },
                "voxelres": {
                    "0": resolution
                },
                "resolutions": [
                    0
                ],
                "scaling": "zslices",
                "scalinglevels": 0,
                "timerange": [ 0, 0 ],
            },
            "metadata": {},
            "project": {
                "description": "nyroglancer jupyter extension",
                "name": "nyroglancer",
                "version": "0.0"
            }
        }))
        self.set_header("Content-Type", "application/json")

class Image(IPythonHandler):

    @staticmethod
    def backend(volume, min_x, max_x, min_y, max_y, min_z, max_z):
        """This function will be called in the kernel that started the viewer.
        """

        (chunk_min, chunk_max, chunk_size) = parse_dimensions(min_x, max_x, min_y, max_y, min_z, max_z)

        chunk = volume.data[
            chunk_min[2]:chunk_max[2],
            chunk_min[1]:chunk_max[1],
            chunk_min[0]:chunk_max[0],
        ]

        chunk_stack = np.zeros((chunk_size[1]*chunk_size[2], chunk_size[0]), dtype=np.uint8)
        for z in range(chunk_size[2]):
            chunk_stack[z*chunk_size[1]:(z+1)*chunk_size[1],:] = chunk[z,:,:]

        stack_img = PilImage.fromarray(chunk_stack)

        fake_file = StringIO()
        stack_img.save(fake_file, "jpeg")

        return binascii.b2a_base64(fake_file.getvalue()).strip()

    def get(self, cf_volume_key, resolution, min_x, max_x, min_y, max_y, min_z, max_z):

        cf = url_unescape(cf_volume_key[:-LEN_VOLUME_KEY])
        volume_key = cf_volume_key[-LEN_VOLUME_KEY:]

        data = evaluate(cf, "nyroglancer.ndstore.Image.backend(nyroglancer.volumes['%s'], %s, %s, %s, %s, %s, %s)" % (volume_key, min_x, max_x, min_y, max_y, min_z, max_z))
        jpg = binascii.a2b_base64(data)
        self.write(jpg)
        self.set_header("Content-Type", "image/jpeg")

class Segmentation(IPythonHandler):

    @staticmethod
    def backend(volume, min_x, max_x, min_y, max_y, min_z, max_z):
        """This function will be called in the kernel that started the viewer.
        """

        (chunk_min, chunk_max, chunk_size) = parse_dimensions(min_x, max_x, min_y, max_y, min_z, max_z)

        # FIXME: neuroglancer does not support uint64 (at the moment), therefore we
        # ship uint32 for now
        chunk = volume.data[
            chunk_min[2]:chunk_max[2],
            chunk_min[1]:chunk_max[1],
            chunk_min[0]:chunk_max[0],
        ].astype(np.uint32)

        fake_file = StringIO()
        np.save(fake_file, chunk[None,:])

        return binascii.b2a_base64(zlib.compress(fake_file.getvalue())).strip()

    def get(self, cf_volume_key, resolution, min_x, max_x, min_y, max_y, min_z, max_z):

        cf = url_unescape(cf_volume_key[:-LEN_VOLUME_KEY])
        volume_key = cf_volume_key[-LEN_VOLUME_KEY:]

        pyz = binascii.a2b_base64(evaluate(cf, "nyroglancer.ndstore.Segmentation.backend(nyroglancer.volumes['%s'], %s, %s, %s, %s, %s, %s)" % (volume_key, min_x, max_x, min_y, max_y, min_z, max_z)))
        self.write(pyz)
        self.set_header("Content-Type", "application/octet-stream")

def parse_dimensions(min_x, max_x, min_y, max_y, min_z, max_z):

    min_x = int(min_x)
    max_x = int(max_x)
    min_y = int(min_y)
    max_y = int(max_y)
    min_z = int(min_z)
    max_z = int(max_z)

    return (
        [ min_x, min_y, min_z ],
        [ max_x, max_y, max_z ],
        [
            get_pos_diff(min_x, max_x),
            get_pos_diff(min_y, max_y),
            get_pos_diff(min_z, max_z)
        ],
    )

def get_pos_diff(start, end):

    d = end - start
    if d < 0:
        raise RuntimeError("invalid dimensions: %i, %i" % (start, end))
    return d
