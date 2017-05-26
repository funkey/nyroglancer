from IPython.display import HTML
from jupyter_client import find_connection_file
from tornado.escape import url_escape
from tornado.httpclient import HTTPClient
import collections
import intrusion
import json
import ndstore
import neuroglancer

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
            response = http_client.fetch(self.get_server_url() + '/register_token/' + volume.token.decode('utf8') + '/' + cf)
        except Exception as e:
            raise RuntimeError("could not register token: " + str(e))
        http_client.close()

    def get_server_url(self):

        return 'http://' + self.hostname
