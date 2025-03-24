# -*- encoding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

{
    'name': 'Quality - Batch Transfer',
    'version': '1.0',
    'category': 'Manufacturing/Quality',
    'summary': 'Support of quality control into batch transfers',
    'depends': [
        'quality_control',
        'stock_picking_batch',
    ],
    'data': [
        'views/stock_picking_batch_views.xml',
    ],
    'auto_install': True,
    'installable': True,
    'author': 'Harpiya Software Technologies, LLC',
    'license': 'OEEL-1',
}
