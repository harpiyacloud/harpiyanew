# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import fields, models
from harpiya.exceptions import UserError


class AccountReport(models.Model):
    _inherit = 'account.report'

    def _report_custom_engine_executive_summary_ndays(self, expressions, options, date_scope, current_groupby, next_groupby, offset=0, limit=None, warnings=None):
        if current_groupby or next_groupby:
            raise UserError(self.env._("NDays expressions of executive summary report don't support the 'group by' feature."))

        date_diff = fields.Date.from_string(options['date']['date_to']) - fields.Date.from_string(options['date']['date_from'])
        return {'result': date_diff.days}
