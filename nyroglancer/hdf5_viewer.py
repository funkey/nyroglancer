from __future__ import print_function
from viewer import Viewer
from shaders import rgb
import h5py
import numpy as np
import gc

class Hdf5Viewer(Viewer):

    def __init__(self, filename = None, show_layer_numbers=False):

        super(Hdf5Viewer, self).__init__()
        self.files = []
        self.num_datasets = 0
        self.show_layer_numbers = show_layer_numbers

        if filename is not None:
            self.add_file(filename)

    def add_file(self, filename):

        # make sure this file is closed before opening it again, h5py doesn't
        # handle this well otherwise
        for obj in gc.get_objects():
            if isinstance(obj, h5py.File) and obj.filename == filename:
                try:
                    print("Closing previously open %s"%filename)
                    obj.close()
                    print("Closed")
                except:
                    print("Could not close")
                    pass

        f = h5py.File(filename, 'r')
        self.files.append(f)
        self.__traverse_add(f, filename)

    def add_dataset(self, dataset, name):

        kwargs = {}
        if 'offset' in dataset.attrs:
            kwargs['offset'] = tuple(dataset.attrs['offset'][::-1])
        if 'resolution' in dataset.attrs:
            kwargs['voxel_size'] = tuple(dataset.attrs['resolution'][::-1])
        elif 'voxel_size' in dataset.attrs:
            kwargs['voxel_size'] = tuple(dataset.attrs['voxel_size'][::-1])

        # strip 1-dimensions
        while len(dataset.shape) > 3 and dataset.shape[0] == 1:
            dataset = dataset[0]

        if len(dataset.shape) not in [3,4]:
            print("Skipping " + name)
            return

        self.num_datasets += 1
        print("Adding dataset", name, "as", self.num_datasets)

        if len(dataset.shape) == 4 and dataset.shape[0] == 3:
            kwargs['shader'] = rgb()

        if dataset.dtype == np.bool:
            dataset = np.array(dataset, dtype=np.uint8)*255

        if self.show_layer_numbers:
            name = str(self.num_datasets)

        self.add(dataset, name=name, **kwargs)

    def __traverse_add(self, item, filename):

        if isinstance(item, h5py.Dataset):
            self.add_dataset(item, filename + item.name)
        elif isinstance(item, h5py.Group):
            for k in item:
                self.__traverse_add(item[k], filename)
        else:
            print("Skipping " + item.name)
