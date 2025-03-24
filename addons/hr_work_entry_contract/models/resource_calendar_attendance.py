# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import models


class ResourceCalendarAttendance(models.Model):
    _inherit = 'resource.calendar.attendance'

    def _is_work_period(self):
        return not self.work_entry_type_id.is_leave and super()._is_work_period()
