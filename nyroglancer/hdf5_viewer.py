from __future__ import print_function
from viewer import Viewer
from shaders import rgb
import h5py
import numpy as np

class Hdf5Viewer(Viewer):

    def __init__(self, filename = None):

        super(Hdf5Viewer, self).__init__()
        self.files = []

        if filename is not None:
            self.add_file(filename)

    def add_file(self, filename):

        f = h5py.File(filename, 'r')
        self.files.append(f)
        self.__traverse_add(f, filename)

    def add_dataset(self, dataset, name):

        if len(dataset.shape) not in [3,4]:
            print("Skipping " + name)
            return

        print("Adding dataset", name)

        kwargs = {}
        if 'offset' in dataset.attrs:
            kwargs['offset'] = tuple(dataset.attrs['offset'][::-1])
        if 'resolution' in dataset.attrs:
            kwargs['voxel_size'] = tuple(dataset.attrs['resolution'][::-1])
        elif 'voxel_size' in dataset.attrs:
            kwargs['voxel_size'] = tuple(dataset.attrs['voxel_size'][::-1])
        if len(dataset.shape) == 4 and dataset.shape[0] == 3:
            kwargs['shader'] = rgb()

        if dataset.dtype == np.bool:
            dataset = np.array(dataset, dtype=np.uint8)*255

        self.add(dataset, name=name, **kwargs)

    def __traverse_add(self, item, filename):

        if isinstance(item, h5py.Dataset):
            self.add_dataset(item, filename + item.name)
        elif isinstance(item, h5py.Group):
            for k in item:
                self.__traverse_add(item[k], filename)
        else:
            print("Skipping " + item.name)
