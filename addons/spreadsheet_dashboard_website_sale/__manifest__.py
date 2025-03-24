# Part of Harpiya. See LICENSE file for full copyright and licensing details.
{
    'name': "Spreadsheet dashboard for eCommerce",
    'version': '1.0',
    'category': 'Hidden',
    'summary': 'Spreadsheet',
    'description': 'Spreadsheet',
    'depends': ['spreadsheet_dashboard', 'website_sale'],
    'data': [
        'data/dashboards.xml',
    ],
    'installable': True,
    'auto_install': ['website_sale'],
    'author': 'Harpiya Software Technologies, LLC',
    'license': 'LGPL-3',
}
