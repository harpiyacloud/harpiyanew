# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import models, fields


class ResCompany(models.Model):
    _inherit = "res.company"

    account_check_printing_layout = fields.Selection(
        selection_add=[('l10n_ph_check_printing.action_print_check', 'Print Check - PH')],
        ondelete={'l10n_ph_check_printing.action_print_check': 'set default'},
    )
