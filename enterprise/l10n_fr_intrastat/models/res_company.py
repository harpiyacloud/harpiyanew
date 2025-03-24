# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import fields, models


class ResCompany(models.Model):
    _inherit = 'res.company'

    l10n_fr_intrastat_envelope_id = fields.Char(
        string="DEBWEB2 Identifier",
        size=4,
        help="Approval number issued by the local collection center (mode DTI+), with a size of 4 characters",
    )
