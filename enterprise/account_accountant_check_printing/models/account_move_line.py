# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import fields, models


class AccountMoveLine(models.Model):
    _inherit = "account.move.line"

    check_number = fields.Char(
        string="Check Number",
        related='payment_id.check_number',
    )
