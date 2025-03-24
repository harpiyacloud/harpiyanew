# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.
from harpiya import fields, models


class ResPartner(models.Model):
    _inherit = 'res.partner'

    l10n_cl_dte_email = fields.Char(string='DTE Email', help="Chile: Email used to send and receive electronic documents.")

    def _l10n_cl_is_foreign(self):
        return self.country_id.code != "CL"
