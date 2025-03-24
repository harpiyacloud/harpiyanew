#-*- coding:utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.
from harpiya import models, api, _
from harpiya.exceptions import UserError


class AccountJournal(models.Model):
    _inherit = "account.journal"

    @api.ondelete(at_uninstall=False)
    def _prevent_unlink_payroll_journal(self):
        payroll_journals = self.env['hr.payroll.structure'].sudo().search([]).journal_id
        if self & payroll_journals:
            raise UserError(_("You cannot delete the journal linked to a Salary Structure"))
