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

    def put(self, array, voxel_size = [1.0, 1.0, 1.0], offset = [0, 0, 0], volume_type = None, chunk_data_sizes = None, name = None, shader = None, visible = True):
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
        chunk_data_sizes: [ [float] ], optional
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

        if chunk_data_sizes is None:

            # guess a chunk size, such that the max size of the chunk is
            # 2**21 = 2**(3*7)
            #
            # in isotropic volumes, this is [2**7, 2**7, 2**7]
            #
            # in unisotropic volumes, we redistribute the exponent according to 
            # the resolution

            # voxels per world unit
            vpu = [ 1.0/r for r in voxel_size ]
            sum_vpu = sum(vpu)
            b0 = int((float(vpu[0])/sum_vpu)*21)
            b1 = int((float(vpu[1])/sum_vpu)*21)
            b2 = int((float(vpu[2])/sum_vpu)*21)
            chunk_data_sizes = [ [ 2**b0, 2**b1, 2**b2 ] ]

        self.add(array, name=name, voxel_size=voxel_size, offset=offset, volume_type=volume_type, shader=shader, visible=visible, chunk_data_sizes=chunk_data_sizes)

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
