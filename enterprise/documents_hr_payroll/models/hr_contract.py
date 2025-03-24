# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import models


class HrContract(models.Model):
    _inherit = 'hr.contract'

    def _get_sign_request_folder(self):
        self.ensure_one()
        return self.company_id.documents_payroll_folder_id or super()._get_sign_request_folder()
