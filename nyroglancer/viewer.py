from IPython.display import HTML
from jupyter_client import find_connection_file
from tornado.escape import url_escape
from tornado.httpclient import HTTPClient
import collections
import intrusion
import json
import ndstore
import neuroglancer
import urllib

# volumes of all viewer instances
volumes = {}

class Viewer(neuroglancer.BaseViewer):

    def __init__(self):

        self.layers = collections.OrderedDict()
        self.hostname = 'localhost:8888'
        self.large = False
        super(Viewer, self).__init__()

    def set_large(self, large = True):
        """Let the viewer span the whole width of the browser window.

        This will resize your IPython column to the same width.
        """
        self.large = large

    def set_hostname(self, hostname):
        """Set the name of the server running the Jupyter Notebook.

        Defaults to "localhost:8888". Change this if you use a remote server.
        """
        self.hostname = hostname

    def put(self, array, voxel_size = [1.0, 1.0, 1.0], offset = [0, 0, 0], volume_type = None, max_voxels_per_chunk_log2 = None, name = None, shader = None, visible = True):
        """
        Prepare a numpy array for visualization.

        Parameters
        ----------
        array: numpy.array
            The data to show.
        voxel_size: [float], optional
            The resolution of the data.
        offset: [float], optional
            The offset of the volume in world units.
        volume_type: string, optional
            "image" or "segmentation". If not set, it will be guessed based on the data type of `array`.
        max_voxels_per_chunk_log2: int, optional
            The chunk sizes to be used by neuroglancer to load parts of the 
            volume. Multiple arrays can be given to use different chunk sizes in 
            the different viewports. If only one chunk size is given, it will be 
            used by all viewports (and chunks are shared between viewports).
        name: string, optional
            A human readable name for the volume. Will be shown as the layer name in the viewer.
        shader: string, optional
            A GLSL shader used to render the volume. See 
            https://github.com/google/neuroglancer/blob/master/src/neuroglancer/sliceview/image_layer_rendering.md 
            for details.
        visible: bool, optional
            Set the initial visibility of this volume.
        """

        self.add(array, name=name, voxel_size=voxel_size, offset=offset, volume_type=volume_type, shader=shader, visible=visible, max_voxels_per_chunk_log2=max_voxels_per_chunk_log2)

    def show(self):
        """Show the viewer.
        """

        viewer_url = self.get_server_url() + '/neuroglancer' + '#!' + self.get_encoded_state()
        large_html = "<style>.container { width:100% !important; }</style>" if self.large else ""

        return HTML(large_html + "<iframe src=\"" + viewer_url + "\" width=\"100%\" height=\"1024px\"><\iframe>")

    def register_volume(self, volume):

        # globally register volume
        global volumes
        volumes[volume.token] = volume

        # globally register kernel client for this volume in the Jupyter server
        cf = url_escape(find_connection_file())
        http_client= HTTPClient()
        try:
            response = http_client.fetch(self.get_server_url() + '/register_token/' + volume.token + '/' + cf)
        except Exception as e:
            raise RuntimeError("could not register token: " + str(e))
        http_client.close()

    def get_server_url(self):

        return 'http://' + self.hostname
