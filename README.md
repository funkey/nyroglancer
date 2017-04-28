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
c.NotebookApp.nbserver_extensions = { 'nyroglancer.extension': True }
```

Usage
=====

In your notebook, create a `nyroglancer.Viewer` and populate it with the numpy arrays you'd like to visualize. The following snippet shows how to read numpy arrays from an HDF5 file and show them:

```python
import nyroglancer
import numpy as np
import h5py

raw = h5py.File("test.hdf")['volumes/raw']
seg = h5py.File("test.hdf")['volumes/labels/neuron_ids']

big_viewer = nyroglancer.Viewer()
big_viewer.add(raw, volume_type="image", voxel_size = [4.0, 4.0, 40.0], name="raw")
big_viewer.add(seg, volume_type="segmentation", voxel_size = [4.0, 4.0, 40.0], name="neuron IDs")
big_viewer.show()
```
