# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

{
    'name': 'Cohort View',
    'summary': 'Basic Cohort view for harpiya',
    'category': 'Hidden',
    'depends': ['web'],
    'assets': {
        'web.assets_backend_lazy': [
            'web_cohort/static/src/**/*',
        ],
        'web.assets_unit_tests': [
            'web_cohort/static/tests/**/*.js',
        ],
    },
    'auto_install': True,
    'author': 'Harpiya Software Technologies, LLC',
    'license': 'OEEL-1',
}
