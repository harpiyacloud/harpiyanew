# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import fields, models


class ResCountry(models.Model):
    _inherit = 'res.country'

    demonym = fields.Char(translate=True, help="Adjective for relationship"
                          " between a person and a country.")
