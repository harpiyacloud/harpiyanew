# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import api, models


class StockPackageType(models.Model):
    _inherit = 'stock.package.type'

    @api.model
    def _get_fields_stock_barcode(self):
        return ['barcode', 'name']
