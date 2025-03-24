# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import fields, models


class HrEmployee(models.Model):
    _inherit = 'hr.employee'

    ucm_code = fields.Char("UCM code", groups="hr.group_hr_user")
