from IPython.display import HTML
from jupyter_client import find_connection_file
from tornado.escape import url_escape
import ndstore

# TODO: get from web server
hostname = 'localhost:8888'

# volumes of all viewer instances
volumes = {}

class Volume:

    def __init__(self, data, resolution, vtype, chunk_size, name):

        self.data = data
        self.resolution = resolution
        self.vtype = vtype
        self.chunk_size = chunk_size
        self.name = name

class Viewer:

    def __init__(self):

        self.volumes = {}
        self.setup_ndstore_url()

    def put(self, array, resolution = [1.0, 1.0, 1.0], vtype="raw", chunk_size = [ 100, 100, 100 ], name = None):
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
            An identifier for the volume, to be used with `show`.
        """

        key = ndstore.create_key()

        if name is None:
            name = key

        volume = Volume(array, resolution, vtype, chunk_size, name)
        self.volumes[key] = volume

        global volumes
        volumes[key] = volume

        return key

    def show(self):

        layers = {}
        num = 0
        for (key, volume) in self.volumes.iteritems():

            layers[volume.name] = {
                'type': 'image' if volume.vtype is 'raw' else 'segmentation',
                'source': 'ndstore://http://' + hostname + '/' + self.kernel_esc_path + key
            }

        layers_url = str(layers).replace(' ', '').replace(',', '_')

        viewer_url = "http://" + hostname + '/viewer#!{\'layers\':' + layers_url + '_\'navigation\':{\'pose\':{\'position\':{\'voxelSize\':[1_1_1]_\'voxelCoordinates\':[50_50_50]}}_\'zoomFactor\':1}_\'perspectiveZoom\':1}'

        return HTML("<iframe src=\"" + viewer_url + "\" width=\"100%\" height=\"1024px\"><\iframe>")

    def create_info_url(volume_key):

        #<a href=\"" + ndstore_url + "/public_tokens/\">public_tokens</a>
        return HTML("<a href=\"../ocp/ca/" + self.kernel_esc_path + volume_key + "/info/\">info</a>")

    def setup_ndstore_url(self):

        connection_file = find_connection_file()
        self.kernel_esc_path = url_escape(connection_file)
