# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.
{
    'name': "Spreadsheet dashboard for accounting",
    'version': '1.0',
    'category': 'Hidden',
    'summary': 'Spreadsheet',
    'description': 'Spreadsheet',
    'depends': ['spreadsheet_dashboard', 'account'],
    'data': [
        "data/dashboards.xml",
    ],
    'installable': True,
    'auto_install': ['account'],
    'author': 'Harpiya Software Technologies, LLC',
    'license': 'LGPL-3',
}
