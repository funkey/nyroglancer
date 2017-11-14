#!/usr/bin/env python

from setuptools import setup, find_packages

static_files = ['main.bundle.js', 'chunk_worker.bundle.js', 'styles.css', 'index.html']

setup(
    name='nyroglancer',
    version='1.0.3',
    description='jupyter extension for neuroglancer',
    author='Jan Funke',
    author_email='jfunke@iri.upc.edu',
    url='https://github.com/funkey/nyroglancer',
    license = 'Apache License 2.0',
    packages = find_packages(),
    package_data={
        'nyroglancer.static': static_files,
    },
    install_requires = [
        "jupyter",
        "neuroglancer==0.0.8",
        "h5py",
    ],
    use_2to3 = True,
)
