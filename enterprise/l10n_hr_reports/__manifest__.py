# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

{
    'name': 'Croatia - Accounting Reports',
    'version': '1.0',
    'category': 'Accounting/Localizations/Reporting',
    'description': """
Accounting reports for Croatia
    """,
    'depends': [
        'l10n_hr', 'account_reports'
    ],
    'data': [
        'data/balance_sheet.xml',
        'data/profit_loss.xml',
    ],
    'installable': True,
    'auto_install': ['l10n_hr', 'account_reports'],
    'website': 'https://www.harpiya.com/app/accounting',
    'author': 'Harpiya Software Technologies, LLC',
    'license': 'OEEL-1',
}
