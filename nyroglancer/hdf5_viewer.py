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

        if dataset.ndim < 3:
            print("Skipping dataset", name, "with shape", dataset.shape)
            return
        elif dataset.ndim > 4:
            try:
                print("Reshaping dataset", name, "with shape", dataset.shape, "to be 4-dimensional")
                data = dataset[:]
                data = data.reshape(data.shape[-4:])
            except Exception as e:
                print(e)
                raise Exception("Dataset had too many dimensions, but reshaping to", new_shape, "didn't work :(")
        else:
            data = dataset

        print("Adding layer", name)

        kwargs = {}
        if 'offset' in dataset.attrs:
            offset_voxels = tuple(dataset.attrs['offset'][::-1])
        else:
            offset_voxels = (0, 0, 0)
        if 'resolution' in dataset.attrs:
            resolution = tuple(dataset.attrs['resolution'][::-1])
        elif 'voxel_size' in dataset.attrs:
            resolution = tuple(dataset.attrs['voxel_size'][::-1])
        else:
            resolution = (1, 1, 1)
        kwargs['voxel_size'] = resolution
        offset_nanometers = tuple(ov * r for ov, r in zip(offset_voxels, resolution))
        kwargs['offset'] = offset_nanometers
        if data.ndim == 4 and data.shape[0] == 3:
            kwargs['shader'] = rgb()

        if data.dtype == np.bool:
            data = np.array(data, dtype=np.uint8) * 255

        self.add(data, name=name, **kwargs)

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
