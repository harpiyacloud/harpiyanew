# Part of Harpiya. See LICENSE file for full copyright and licensing details.

{
    'name': 'Ecuador - Sale',
    'version': '1.0',
    'description': """Ecuador Sale""",
    'category': 'Accounting/Localizations/Sale',
    'depends': [
        'l10n_ec',
        'sale',
    ],
    'data': [
        'views/payment_method_views.xml',
        'views/sale_order_views.xml',
    ],
    'auto_install': True,
    'author': 'Harpiya Software Technologies, LLC',
    'license': 'LGPL-3',
}
