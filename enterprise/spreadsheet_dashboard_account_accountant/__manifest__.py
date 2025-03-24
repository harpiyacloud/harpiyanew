# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.
{
    'name': "Spreadsheet dashboard for accounting",
    'version': '1.0',
    'category': 'Hidden',
    'summary': 'Spreadsheet',
    'description': 'Spreadsheet',
    'depends': ['spreadsheet_dashboard', 'accountant'],
    'data': [
        "data/dashboards.xml",
    ],
    'installable': True,
    'auto_install': ['accountant'],
    'author': 'Harpiya Software Technologies, LLC',
    'license': 'OEEL-1',
}
