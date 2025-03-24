# coding: utf-8
# Part of Harpiya. See LICENSE file for full copyright and licensing details.
from harpiya import models, fields


class L10n_Us1099_Box(models.Model):
    _name = "l10n_us.1099_box"
    _description = "Represents a box on a 1099 box."

    name = fields.Char("Name", required=True)
