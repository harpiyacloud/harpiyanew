# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

{
    'name': 'Salary Configurator - Holidays',
    'category': 'Human Resources',
    'summary': 'Automatically creates extra time-off on contract signature',
    'depends': [
        'hr_contract_salary',
        'hr_holidays',
    ],
    'data': [
        'views/hr_contract_views.xml',
        'views/res_config_settings_views.xml',
    ],
    'author': 'Harpiya Software Technologies, LLC',
    'license': 'OEEL-1',
    'auto_install': True,
}
