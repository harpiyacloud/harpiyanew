# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import models, api


class ResPartner(models.Model):
    _inherit = 'res.partner'

    @api.model
    def _get_fields_stock_barcode(self):
        return ['display_name']
