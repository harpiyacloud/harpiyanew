# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import fields, models


class ProjectTask(models.Model):
    _inherit = "project.task"

    user_skill_ids = fields.One2many('hr.employee.skill', related='user_ids.employee_skill_ids')
