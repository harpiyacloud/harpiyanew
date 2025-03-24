# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import models, fields
from harpiya.tools import get_lang


class HrTimesheetStopTimerConfirmationWizard(models.Model):
    _inherit = 'hr.timesheet.stop.timer.confirmation.wizard'

    def action_save_timesheet(self):
        super().action_save_timesheet()
        if self.timesheet_id.task_id and self.timesheet_id.project_id.sudo().is_fsm:
            date = fields.Datetime.context_timestamp(self, fields.Datetime.now())
            self.timesheet_id.task_id.message_post(
                body=self.env._(
                    'Timer stopped at: %(date)s %(time)s',
                    date=date.strftime(get_lang(self.env).date_format),
                    time=date.strftime(get_lang(self.env).time_format),
                ),
            )
