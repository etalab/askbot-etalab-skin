#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import re
import codecs

from setuptools import setup, find_packages

PYPI_RST_FILTERS = (
    # Replace code-blocks
    (r'\.\.\s? code-block::\s*(\w|\+)+',  '::'),
    # Remove travis ci badge
    (r'.*travis-ci\.org/.*', ''),
    # Remove pypip.in badges
    (r'.*pypip\.in/.*', ''),
    (r'.*crate\.io/.*', ''),
    (r'.*coveralls\.io/.*', ''),
)


def rst(filename):
    '''
    Load rst file and sanitize it for PyPI.
    Remove unsupported github tags:
     - code-block directive
     - travis ci build badge
    '''
    content = codecs.open(filename, encoding='utf-8').read()
    for regex, replacement in PYPI_RST_FILTERS:
        content = re.sub(regex, replacement, content, flags=re.U)
    return content


long_description = u'\n'.join((
    rst('README.rst'),
    rst('CHANGELOG.rst'),
    u''
))

setup(
    name='askbot-etalab',
    version=__import__('askbot_etalab').__version__,
    description=__import__('askbot_etalab').__description__,
    long_description=long_description,
    url='https://github.com/etalab/askbot-etalab-skin',
    download_url='http://pypi.python.org/pypi/askbot-etalab',
    author='Axel Haustant',
    author_email='axel.haustant@etalab2.fr',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'askbot >= 0.7.49',
    ],
    license='LGPL',
    use_2to3=True,
    keywords='',
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Programming Language :: Python",
        "Environment :: Web Environment",
        "Operating System :: OS Independent",
        "Intended Audience :: Developers",
        "Topic :: System :: Software Distribution",
        "Programming Language :: Python",
        "Programming Language :: Python :: 2",
        "Programming Language :: Python :: 2.7",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "License :: OSI Approved :: GNU Affero General Public License v3 or later (AGPLv3+)",
    ],
)
