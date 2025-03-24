# -*- coding: utf-8 -*-
from harpiya import fields, models


class ResPartner(models.Model):
    _inherit = 'res.partner'

    is_avatax_valid = fields.Boolean()
