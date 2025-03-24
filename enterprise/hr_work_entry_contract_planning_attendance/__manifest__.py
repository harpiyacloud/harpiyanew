#-*- coding:utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

{
    'name': 'Attendances - Planning',
    'category': 'Human Resources/Employees',
    'sequence': 95,
    'summary': 'Create work entries from attendances based on employee\'s planning',
    'depends': [
        'hr_work_entry_contract_planning',
        'hr_work_entry_contract_attendance',
    ],
    'author': 'Harpiya Software Technologies, LLC',
    'license': 'OEEL-1',
    'auto_install': True,
}
