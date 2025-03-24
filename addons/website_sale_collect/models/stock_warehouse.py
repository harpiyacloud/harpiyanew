# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import fields, models


class StockWarehouse(models.Model):
    _inherit = 'stock.warehouse'

    opening_hours = fields.Many2one(
        string="Opening Hours", comodel_name='resource.calendar', check_company=True
    )
