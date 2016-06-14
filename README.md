Neuroglancer Jupyter Extension
==============================

A jupyter extension to visualize numpy arrays using Google's [neuroglancer](https://github.com/google/neuroglancer).

Installation
============

Make sure you meet the requirements of this extensions:

```shell
pip install -r requirements.txt
```

The extension itself is installed as a python module with the name `nyroglancer`:

```shell
python setup.py install
```

Finally, the extension has to be enabled in jupyter. Add to
`~/.jupyter/profile_default/jupyter_notebook_config.py` the module
`nyroglancer.extension`, e.g.:
```python
c = get_config()
c.NotebookApp.nbserver_extensions = { 'nyroglancer.extension': True }
```
