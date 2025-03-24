# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    default_l10n_id_bpjs_jkk = fields.Float(
        string="BPJS JKK (%)", readonly=False,
        default_model="hr.contract", default=0.0024
    )
