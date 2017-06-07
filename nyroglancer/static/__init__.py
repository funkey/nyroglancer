import pkg_resources

main_js = pkg_resources.resource_string(__name__, 'main.bundle.js')
chunk_worker_js = pkg_resources.resource_string(__name__, 'chunk_worker.bundle.js')
styles_css = pkg_resources.resource_string(__name__, 'styles.css')
index_html = pkg_resources.resource_string(__name__, 'index.html')
