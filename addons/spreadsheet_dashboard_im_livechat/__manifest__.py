# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.
{
    'name': "Spreadsheet dashboard for live chat",
    'version': '1.0',
    'category': 'Hidden',
    'summary': 'Spreadsheet',
    'description': 'Spreadsheet',
    'depends': ['spreadsheet_dashboard', 'im_livechat'],
    'data': [
        "data/dashboards.xml",
    ],
    'installable': True,
    'auto_install': ['im_livechat'],
    'author': 'Harpiya Software Technologies, LLC',
    'license': 'LGPL-3',
}
