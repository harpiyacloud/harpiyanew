# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

{
    'name': 'HarpiyaBot',
    'version': '1.2',
    'category': 'Productivity/Discuss',
    'summary': 'Add HarpiyaBot in discussions',
    'website': 'https://www.harpiya.com/app/discuss',
    'depends': ['mail'],
    'auto_install': True,
    'installable': True,
    'data': [
        'views/res_users_views.xml',
        'data/mailbot_data.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'mail_bot/static/src/scss/harpiyabot_style.scss',
        ],
    },
    'author': 'Harpiya Software Technologies, LLC',
    'license': 'LGPL-3',
}
