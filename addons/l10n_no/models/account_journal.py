# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import fields, models


class AccountJournal(models.Model):
    _inherit = 'account.journal'

    invoice_reference_model = fields.Selection(selection_add=[
        ('no', 'Norway (000001024000083)')
    ], ondelete={'no': lambda recs: recs.write({'invoice_reference_model': 'harpiya'})})
