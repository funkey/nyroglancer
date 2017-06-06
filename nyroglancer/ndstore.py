from .intrusion import connect, evaluate
from notebook.base.handlers import IPythonHandler
from tornado.escape import url_unescape
from tornado.web import HTTPError
import binascii

connection_files = {}

def register_connection_file(token, connection_file):

    connection_files[token] = connection_file

def get_kernel_client(token):

    if token not in connection_files:
        return None

    return connect(connection_files[token])

class Info(IPythonHandler):

    def get(self, token):

        client = get_kernel_client(token)

        if client is None:
            raise HTTPError(404)

        info = evaluate(client, "nyroglancer.volumes['%s'].info()" % token)

        self.write(info)
        self.set_header("Content-type", "application/json")
        self.set_header("Content-length", len(info))
        self.set_header("Access-Control-Allow-Origin", "*")

class Data(IPythonHandler):

    content_type = {
        "jpeg": "image/jpeg",
        "npz" : "application/octet-stream",
        "raw" : "application/octet-stream",
    }

    @staticmethod
    def backend(volume, scale_key, data_format, min_x, max_x, min_y, max_y, min_z, max_z):
        """This function will be called in the kernel that started the viewer.
        """

        (data, content_type) = volume.get_encoded_subvolume(data_format, [ min_x, min_y, min_z ], [ max_x, max_y, max_z ], scale_key=scale_key)
        return binascii.b2a_base64(data).strip()

    def get(self, data_format, token, scale_key, min_x, max_x, min_y, max_y, min_z, max_z):

        client = get_kernel_client(token)

        if client is None:
            raise HTTPError(404)

        expression = "nyroglancer.ndstore.Data.backend(nyroglancer.volumes['%s'], \"%s\", \"%s\", %s, %s, %s, %s, %s, %s)" % (token, scale_key, data_format, min_x, max_x, min_y, max_y, min_z, max_z)
        ascii_data = evaluate(client, expression)
        data = binascii.a2b_base64(ascii_data)
        self.write(data)
        self.set_header("Content-Type", Data.content_type[data_format])
        self.set_header("Content-Length", len(data))
        self.set_header("Access-Control-Allow-Origin", "*")

class RegisterToken(IPythonHandler):

    def get(self, token, connection_file):

        register_connection_file(token, url_unescape(connection_file))
