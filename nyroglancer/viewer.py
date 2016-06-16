from IPython.display import HTML
from jupyter_client import find_connection_file
from tornado.escape import url_escape
import ndstore

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

        self.volumes = []
        self.setup_ndstore_url()
        self.hostname = 'localhost:8888'

    def set_hostname(self, hostname):
        """Set the name of the server running the Jupyter Notebook.

        Defaults to "localhost:8888". Change this if you use a remote server.
        """
        self.hostname = hostname

    def put(self, array, resolution = [1.0, 1.0, 1.0], vtype="raw", chunk_size = None, name = None):
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

        if chunk_size is None:

            # guess a chunk size, such that the max size of the chunk is
            # 2**21 = 2**(3*7)
            #
            # in isotropic volumes, this is [2**7, 2**7, 2**7]
            #
            # in unisotropic volumes, we redistribute the exponent according to 
            # the resolution

            # voxels per world unit
            vpu = [ 1.0/r for r in resolution ]
            sum_vpu = sum(vpu)
            b0 = int((float(vpu[0])/sum_vpu)*21)
            b1 = int((float(vpu[1])/sum_vpu)*21)
            b2 = int((float(vpu[2])/sum_vpu)*21)
            chunk_size = [ 2**b0, 2**b1, 2**b2 ]

        if name is None:
            name = key

        volume = Volume(array, resolution, vtype, chunk_size, name)
        self.volumes.append((key, volume))

        global volumes
        volumes[key] = volume

        return key

    def show(self):

        layers = {}
        num = 0
        for (key, volume) in self.volumes:

            layers[volume.name] = {
                'type': 'image' if volume.vtype is 'raw' else 'segmentation',
                'source': 'ndstore://http://' + self.hostname + '/' + self.kernel_esc_path + key
            }

        layers_url = str(layers).replace(' ', '').replace(',', '_')

        viewer_url = "http://" + self.hostname + '/viewer#!{\'layers\':' + layers_url + '_\'navigation\':{\'pose\':{\'position\':{\'voxelSize\':[1_1_1]_\'voxelCoordinates\':[50_50_50]}}_\'zoomFactor\':1}_\'perspectiveZoom\':1}'

        return HTML("<iframe src=\"" + viewer_url + "\" width=\"100%\" height=\"1024px\"><\iframe>")

    def create_info_url(volume_key):

        #<a href=\"" + ndstore_url + "/public_tokens/\">public_tokens</a>
        return HTML("<a href=\"../ocp/ca/" + self.kernel_esc_path + volume_key + "/info/\">info</a>")

    def setup_ndstore_url(self):

        connection_file = find_connection_file()
        self.kernel_esc_path = url_escape(connection_file)
