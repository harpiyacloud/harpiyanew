# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.
{
    'name': "Gulf Cooperation Council WMS Accounting",
    'version': '1.0',
    'description': """
        Arabic/English for GCC + lot/SN numbers
    """,
    'website': "https://www.harpiya.com",
    'category': 'Accounting/Localizations',

    'depends': ['l10n_gcc_invoice', 'stock_account'],

    'data': [
        'views/report_invoice.xml',
    ],
    'auto_install': True,
    'author': 'Harpiya Software Technologies, LLC',
    'license': 'LGPL-3',
}
