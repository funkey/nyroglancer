from __future__ import print_function

import os

import h5py
import numpy as np

from viewer import Viewer
from shaders import rgb


class Hdf5Viewer(Viewer):

    def __init__(self, filepath=None):

        super(Hdf5Viewer, self).__init__()
        self.files = []

        if filepath is not None:
            self.add_file(filepath)

    def add_file(self, filepath):

        f = h5py.File(filepath, 'r')
        self.files.append(f)
        self.__traverse_add(f)

    def add_dataset(self, dataset, name):

        if dataset.ndim not in [3, 4]:
            print("Skipping dataset", name, "with shape", dataset.shape)
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

    def __traverse_add(self, item):

        if isinstance(item, h5py.Dataset):
            filename = os.path.basename(item.file.filename)
            dataset_name = item.name.lstrip(os.path.sep)
            layer_name = os.path.join(filename, dataset_name)
            self.add_dataset(item, layer_name)
        elif isinstance(item, h5py.Group):
            for k in item:
                self.__traverse_add(item[k])
        else:
            print("Skipping item", item)
