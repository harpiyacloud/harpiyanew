# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import models, fields


class SaleCommissionAchievement(models.Model):
    _inherit = 'sale.commission.achievement'

    type = fields.Selection(selection_add=[('margin', "Margin")], ondelete={'margin': 'cascade'})
