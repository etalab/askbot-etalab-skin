askbot-etalab-skin
==================

Askbot skin for ETALAB

Installation
------------

This modification require a specific Askbot version.
Right now, you can use the version hosted at `Etalab repository`_
until these Pull Requests are merged:

- `#170 <https://github.com/ASKBOT/askbot-devel/pull/170>`_
- `#175 <https://github.com/ASKBOT/askbot-devel/pull/175>`_

Add the following to your settings.py

.. code:: python

    ETALAB_DOMAIN = 'etalab.dev'
    ETALAB_HOME_URL = 'http://www.etalab.dev'
    ETALAB_WIKI_URL = 'http://wiki.etalab.dev'
    ETALAB_WIKI_API_URL = 'http://wiki.etalab.dev/api.php'
    ETALAB_QUESTIONS_URL = 'http://questions.etalab.dev'
    ETALAB_GROUPS = (
        ('Group title', 'icon', None),
        ('Another group', 'another-icon', '{wiki}/Topic'),
    )

    # ...

    from askbot_etalab import SKIN_DIR as ASKBOT_EXTRA_SKINS_DIR

    STATICFILES_DIRS = (
        # ....
        ASKBOT_EXTRA_SKINS_DIR,
    )

    TEMPLATE_CONTEXT_PROCESSORS = (
        # ...
        'askbot_etalab.context_processors.etalab_config',
    )

    INSTALLED_APPS = (
        # ...
        'askbot_etalab',
    )

Customize the ``ETALAB_*`` variable to match your configuration.

Development
-----------

You need bower, less, uglifyjs and grunt installed:

.. code:: console

    $ sudo npm install -g bower uglify-js less grunt-cli

Install local grunt/npm requirements:

.. code:: console

    $ npm install

Update localization on transifex
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: console

    $ make i18n

Build assets
~~~~~~~~~~~~

.. code:: console

    $ make assets

Generate a distributable source package
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: console

    $ make dist


.. _Etalab repository: https://github.com/etalab/askbot-devel/tree/for-etalab
