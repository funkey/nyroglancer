from __future__ import print_function
from viewer import Viewer
import h5py

class Hdf5Viewer(Viewer):

    def __init__(self, filename):

        super(Hdf5Viewer, self).__init__()
        self.file = h5py.File(filename, 'r')

        self.__traverse_add(self.file)

    def add_dataset(self, dataset, name):

        offset = [0,0,0]
        voxel_size = [1,1,1]

        if 'offset' in dataset.attrs:
            offset = dataset.attrs['offset'][::-1]
        if 'resolution' in dataset.attrs:
            voxel_size = dataset.attrs['resolution'][::-1]
        elif 'voxel_size' in dataset.attrs:
            voxel_size = dataset.attrs['voxel_size'][::-1]

        print("Adding dataset", name, "with resolution", voxel_size, "at", offset)

        self.add(dataset, offset=offset, voxel_size=voxel_size, name=name)

    def __traverse_add(self, item):

        print("entering " + item.name)

        if isinstance(item, h5py.Dataset):
            self.add_dataset(item, item.name)
        elif isinstance(item, h5py.Group):
            for k in item:
                self.__traverse_add(item[k])
        else:
            print("Skipping " + item.name)
