from IPython.display import HTML
from jupyter_client import find_connection_file
from notebook.base.handlers import IPythonHandler
from notebook.utils import url_path_join
from tornado.escape import url_escape
import chunk_worker_bundle_js
import main_bundle_js
import ndstore
import neuroglancer_css

# TODO: get from web server
hostname = 'localhost:8888'
base_url = ""
kernel_esc_path = None

volumes = {}

class Volume:

    def __init__(self, data, resolution, vtype, chunk_size, name):

        self.data = data
        self.resolution = resolution
        self.vtype = vtype
        self.chunk_size = chunk_size
        self.name = name

class Viewer(IPythonHandler):

    def get(self):
        self.finish("""
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>neuroglancer</title>
    <link rel="stylesheet" type="text/css" href="../css/neuroglancer.css" />
  </head>
  <body>
    <div id="container" style="width:100%;height:1024px;background:black"></div>
    <script type="text/javascript" src="../js/main.bundle.js"></script>
  </body>
</html>
        """)

class MainBundle(IPythonHandler):
    def get(self):
        self.write(main_bundle_js.content)
        self.set_header("Content-Type", "application/javascript")

class ChunkWorkerBundle(IPythonHandler):
    def get(self):
        self.write(chunk_worker_bundle_js.content)
        self.set_header("Content-Type", "application/javascript")

class NeuroglancerCss(IPythonHandler):
    def get(self):
        self.write(neuroglancer_css.content)
        self.set_header("Content-Type", "text/css")

def load_jupyter_server_extension(nb_server_app):

    web_app = nb_server_app.web_app
    host_pattern = '.*$'

    global base_url
    base_url = web_app.settings['base_url']

    #web_app.add_handlers(host_pattern, [('/ocp/ca/(.*)/public_tokens', ndstore.PublicTokens)])
    web_app.add_handlers(host_pattern, [('/ocp/ca/([^\/]*)/info', ndstore.Info)])
    web_app.add_handlers(host_pattern, [('/viewer', Viewer)])
    web_app.add_handlers(host_pattern, [('/js/main.bundle.js', MainBundle)])
    web_app.add_handlers(host_pattern, [('/js/chunk.worker.bundle.js', ChunkWorkerBundle)])
    web_app.add_handlers(host_pattern, [('/css/neuroglancer.css', NeuroglancerCss)])

    print "nyroglancer loaded! (registered tokens, info, and viewer)"

def setup_ndstore_url():

    global kernel_esc_path
    if kernel_esc_path is None:
        connection_file = find_connection_file()
        print "Set kernel path to " + connection_file
        kernel_esc_path = url_escape(connection_file)

def put(array, resolution = [1.0, 1.0, 1.0], vtype="raw", chunk_size = [ 100, 100, 100 ], name = None):
    """
    Prepare a numpy array for visualization.

    Parameters
    ----------
    array: numpy.array
        The data to show.
    resolution: [float], optional
        The resolution of the data.
    vtype: string, optional
        "raw" or "segmentation"
    name: string, optional
        A human readable name for the volume. Will be shown as the layer name in the viewer.

    Returns
    -------
    key:string
        An identifier for the volume, to be used with `glance`.
    """

    setup_ndstore_url()

    key = ndstore.create_key()

    if name is None:
        name = key

    volume = Volume(array, resolution, vtype, chunk_size, name)
    global volumes
    volumes[key] = volume

    return key


def glance():

    layers = {}
    num = 0
    for (key, volume) in volumes.iteritems():

        layers[volume.name] = {
            'type': 'image' if volume.vtype is 'raw' else 'segmentation',
            'source': 'ndstore://http://' + hostname + '/' + kernel_esc_path + key
        }

    layers_url = str(layers).replace(' ', '').replace(',', '_')

    # CONTINUE:
    # • add one 'layer' per registered volume
    # • generate kernel_esc_path + volume_key
    viewer_url = url_path_join(base_url, '/../viewer#!{\'layers\':' + layers_url + '_\'navigation\':{\'pose\':{\'position\':{\'voxelSize\':[1_1_1]_\'voxelCoordinates\':[50_50_50]}}_\'zoomFactor\':1}_\'perspectiveZoom\':1}')

    return HTML("<iframe src=\"" + viewer_url + "\" width=\"100%\" height=\"1024px\"><\iframe>")

def create_info_url(volume_key):

    #<a href=\"" + ndstore_url + "/public_tokens/\">public_tokens</a>
    return HTML("<a href=\"../ocp/ca/" + kernel_esc_path + volume_key + "/info/\">info</a>")
