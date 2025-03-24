# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import fields, models


class ResCompany(models.Model):
    _inherit = 'res.company'

    l10n_sa_mol_establishment_code = fields.Char(string="MoL Establishment ID")
    l10n_sa_bank_account_id = fields.Many2one("res.partner.bank", string="Establishment's Bank Account")
