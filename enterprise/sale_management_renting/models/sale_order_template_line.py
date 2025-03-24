# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import api, models
from harpiya.osv import expression


class SaleOrderTemplateLine(models.Model):
    _inherit = 'sale.order.template.line'

    @api.model
    def _product_id_domain(self):
        """ Override to allow users to add a rental product to a quotation template line """
        return expression.OR([super()._product_id_domain(), [('rent_ok', '=', True)]])
