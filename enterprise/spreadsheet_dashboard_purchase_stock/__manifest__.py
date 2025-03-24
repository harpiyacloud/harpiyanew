# Part of Harpiya. See LICENSE file for full copyright and licensing details.
{
    'name': "Spreadsheet dashboard for purchases",
    'category': 'Hidden',
    'summary': 'Spreadsheet',
    'description': 'Spreadsheet',
    'depends': ['spreadsheet_dashboard', 'purchase_stock', 'stock_enterprise'],
    'data': [
        "data/dashboards.xml",
    ],
    'installable': True,
    'auto_install': ['purchase_stock', 'stock_enterprise'],
    'author': 'Harpiya Software Technologies, LLC',
    'license': 'OEEL-1',
}
