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
`~/.jupyter/jupyter_notebook_config.py` the module
`nyroglancer.extension`, e.g.:
```python
c = get_config()
c.NotebookApp.server_extensions = ['nyroglancer.extension']
```

or if `~/.jupyter/jupyter_notebook_cofig.json` exists, you can add `nyroglancer.extension` to the
`server_extensions` field.

These config options work as of 5/9/17 with the following package versions:

  - Jupyer: 4.3.0
  - IPython: 5.1.0
  - nbformat: 4.3.0

Try updating nbformat if you have problems - if that fails you may want to check out the docs on the Jupyter config system,
as it seems to change frequently.

Usage
=====

In your notebook, create a `nyroglancer.Viewer` and populate it with the numpy arrays you'd like to visualize. The following snippet shows how to read numpy arrays from an HDF5 file and show them:

```python
import nyroglancer
import h5py

raw = h5py.File("test.hdf")['volumes/raw']
seg = h5py.File("test.hdf")['volumes/labels/neuron_ids']

viewer = nyroglancer.Viewer()
viewer.add(raw, resolution=[40,4,4], name="raw")
viewer.add(seg, resolution=[40,4,4], name="neuron IDs")
viewer.show()
```
