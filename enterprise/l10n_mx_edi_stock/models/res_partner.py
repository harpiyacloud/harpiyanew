# -*- coding: utf-8 -*-

from harpiya import models, fields


class ResPartner(models.Model):
    _inherit = 'res.partner'

    l10n_mx_edi_operator_licence = fields.Char('Operator Licence')
