# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

{
    'name': 'Website Documents',
    'version': '1.0',
    'category': 'Productivity/Documents',
    'sequence': 8010,
    'summary': 'Choose the website on which documents/folder are shared',
    'website': 'https://www.harpiya.com/app/documents',
    'description': """
When sharing documents/folder, the domain of the shared URL can be chosen by selecting a target website.
""",
    'depends': ['documents', 'website'],
    'data': [
        'views/documents_document_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'website_documents/static/src/views/**/*',
        ],
    },
    'auto_install': True,
    'author': 'Harpiya Software Technologies, LLC',
    'license': 'OEEL-1',
}
