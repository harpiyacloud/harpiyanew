# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import fields, models


class HrEmployeePublic(models.Model):
    _inherit = 'hr.employee.public'

    timesheet_manager_id = fields.Many2one('res.users', string='Timesheet',
        help="User responsible of timesheet validation. Should be Timesheet Manager.")
