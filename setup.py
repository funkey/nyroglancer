#!/usr/bin/env python

from setuptools import setup, find_packages

setup(
    name='nyroglancer',
    version='1.0.0',
    description='jupyter extension for neuroglancer',
    author='Jan Funke',
    author_email='jfunke@iri.upc.edu',
    url='https://github.com/funkey/nyroglancer',
    license = 'Apache License 2.0',
    packages = find_packages(),
    install_requires = [
        "jupyter",
        "neuroglancer>=0.0.6",
    ],
    use_2to3 = True,
)
