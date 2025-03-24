# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    l10n_ro_saft_tax_accounting_basis = fields.Selection(
        related='company_id.l10n_ro_saft_tax_accounting_basis',
        readonly=False,
    )
