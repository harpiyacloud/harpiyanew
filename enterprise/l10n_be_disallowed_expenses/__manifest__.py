# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

{
    'name': 'Belgium - Disallowed Expenses Data',
    'version': '1.1',
    'category': 'Accounting/Accounting',
    'description': """
Disallowed Expenses Data for Belgium
    """,
    'depends': [
        'l10n_be',
        'account_disallowed_expenses',
    ],
    'data': [
        'data/account_disallowed_expenses.xml',
    ],
    'installable': True,
    'auto_install': True,
    'website': 'https://www.harpiya.com/app/accounting',
    'author': 'Harpiya Software Technologies, LLC',
    'license': 'OEEL-1',
}
