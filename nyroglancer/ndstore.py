from .intrusion import evaluate
from PIL import Image
from StringIO import StringIO
from notebook.base.handlers import IPythonHandler
from tornado.escape import url_unescape
import json
import math
import numpy as np
import random
import zlib

LEN_VOLUME_KEY=16

def create_key():

    return ''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789') for i in range(LEN_VOLUME_KEY)])

#class PublicTokens(IPythonHandler):

    #def get(self, cf):

        #res = evaluate(cf, "nyroglancer.volumes.keys()")
        #self.finish(res)

class Info(IPythonHandler):

    def get(self, cf_volume_key):

        cf = url_unescape(cf_volume_key[:-LEN_VOLUME_KEY])
        volume_key = cf_volume_key[-LEN_VOLUME_KEY:]

        print "assembling info for volume " + volume_key

        volume_type = evaluate(cf, "nyroglancer.volumes['%s'].vtype" % volume_key)
        is_segmentation = (volume_type == "segmentation")

        volume_size = json.loads(evaluate(cf, "list(nyroglancer.volumes['%s'].data.shape)" % volume_key))
        resolution = json.loads(evaluate(cf, "nyroglancer.volumes['%s'].resolution" % volume_key))
        chunk_size = json.loads(evaluate(cf, "nyroglancer.volumes['%s'].chunk_size" % volume_key))
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

        self.finish(json.dumps({
            "channels": channel_info,
            "dataset": {
                "cube_dimension": {
                    str(i): chunk_size for i in range(num_chunks)
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
