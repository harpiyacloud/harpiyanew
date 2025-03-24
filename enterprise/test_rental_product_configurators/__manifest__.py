# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

{
    'name': "Rental Product Configurators Tests",
    'summary': "Test Suite for Rental Product Configurators",
    'category': "Hidden",
    'depends': [
        'sale_renting',
        'test_sale_product_configurators',
    ],
    'assets': {
        'web.assets_tests': [
            'test_rental_product_configurators/static/tests/tours/**/*',
        ],
    },
    'author': 'Harpiya Software Technologies, LLC',
    'license': 'OEEL-1',
}
