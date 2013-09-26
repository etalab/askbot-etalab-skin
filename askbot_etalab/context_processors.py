# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.template.defaultfilters import slugify


def etalab_config(request):
    '''
    Inject custom Etalab configuration into templates
    '''
    return {
        'etalab': {
            'DOMAIN': settings.ETALAB_DOMAIN,
            'HOME_URL': settings.ETALAB_HOME_URL,
            'WIKI_URL': settings.ETALAB_WIKI_URL,
            'WIKI_API_URL': settings.ETALAB_WIKI_API_URL,
            'QUESTIONS_URL': settings.ETALAB_QUESTIONS_URL,
            'GROUPS': (
                (title, icon, url.format(wiki=settings.ETALAB_WIKI_URL) if url else slugify(title))
                for title, icon, url in settings.ETALAB_GROUPS
            ),
        }
    }
