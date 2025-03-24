# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    partena_code = fields.Char(
        related='company_id.partena_code',
        readonly=False)
