from notebook.base.handlers import IPythonHandler
from nyroglancer.static import *
import ndstore

class Viewer(IPythonHandler):

    def get(self):
        self.finish("""
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>neuroglancer</title>
    <link rel="stylesheet" type="text/css" href="../css/neuroglancer/styles.css" />
  </head>
  <body>
    <div id="container" style="width:100%;height:1024px;background:black"></div>
    <script type="text/javascript" src="../js/neuroglancer/main.bundle.js"></script>
  </body>
</html>
        """)

class MainBundle(IPythonHandler):
    def get(self):
        self.write(main_js.replace("chunk_worker.bundle.js", "js/neuroglancer/chunk_worker.bundle.js"))
        self.set_header("Content-Type", "application/javascript")

class ChunkWorkerBundle(IPythonHandler):
    def get(self):
        self.write(chunk_worker_js)
        self.set_header("Content-Type", "application/javascript")

class StylesCss(IPythonHandler):
    def get(self):
        self.write(styles_css)
        self.set_header("Content-Type", "text/css")

def load_jupyter_server_extension(nb_server_app):

    web_app = nb_server_app.web_app
    host_pattern = '.*$'

    web_app.add_handlers(host_pattern, [('/neuroglancer/info/([^/]+)', ndstore.Info)])
    web_app.add_handlers(host_pattern, [('/neuroglancer/([^/]+)/([^/]+)/([^/]+)/([0-9]*),([0-9]*)/([0-9]*),([0-9]*)/([0-9]*),([0-9]*)', ndstore.Data)])
    web_app.add_handlers(host_pattern, [('/neuroglancer', Viewer)])
    web_app.add_handlers(host_pattern, [('/register_token/([^/]+)/([^/]+)', ndstore.RegisterToken)])
    web_app.add_handlers(host_pattern, [('/js/neuroglancer/main.bundle.js', MainBundle)])
    web_app.add_handlers(host_pattern, [('/js/neuroglancer/chunk.worker.bundle.js', ChunkWorkerBundle)])
    web_app.add_handlers(host_pattern, [('/css/neuroglancer/styles.css', StylesCss)])

    print "nyroglancer extension loaded"
