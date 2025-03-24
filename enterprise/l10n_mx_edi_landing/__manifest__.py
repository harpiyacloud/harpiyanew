# coding: utf-8
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

{
    'name': 'Harpiya Mexico Localization for Stock/Landing',
    'countries': ['mx'],
    'summary': 'Generate Electronic Invoice with custom numbers',
    'version': '1.0',
    'category': 'Accounting/Localizations/EDI',
    'depends': [
        'stock_landed_costs',
        'sale_management',
        'sale_stock',
        'l10n_mx_edi_extended',
    ],
    'data': [
        'views/stock_landed_cost.xml',
    ],
    'installable': True,
    'author': 'Harpiya Software Technologies, LLC',
    'license': 'OEEL-1',
}
