# Part of Harpiya. See LICENSE file for full copyright and licensing details.
from harpiya import models, fields


class L10n_BrNcmCode(models.Model):
    _name = 'l10n_br.ncm.code'
    _description = "NCM Code"

    code = fields.Char("Code")
    name = fields.Char("Name")
