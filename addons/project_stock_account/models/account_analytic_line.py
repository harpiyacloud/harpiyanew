# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import fields, models


class AccountAnalyticLine(models.Model):
    _inherit = 'account.analytic.line'

    category = fields.Selection(selection_add=[('picking_entry', 'Inventory Transfer')])
