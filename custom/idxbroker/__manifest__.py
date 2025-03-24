{
    'name': 'IDX Broker',
    'category': 'Website/Estate',
    'summary': 'Manage your IDX Broker accounts',
    'version': '1.1',
    'description': """Manage your IDX Broker accounts""",
    'depends': ['website'],
    'data': [
        'views/res_config_settings_views.xml',

        # Website snippets
        'views/snippets/snippets.xml',
        'views/snippets/s_dynamic_snippet_estate.xml',
        'views/property_detail_page.xml'
    ],
    'auto_install': True,
    'assets': {
        'website.assets_wysiwyg': [
            'idxbroker/static/src/snippets/options.js',
        ],
        'web.assets_frontend': [
            'idxbroker/static/src/snippets/idxbroker.js'
        ]
    },
    'author': 'Harpiya Software Technologies, LLC',
    'licens': 'OEEL-1',
}