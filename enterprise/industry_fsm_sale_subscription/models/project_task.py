# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.
from harpiya import models
from harpiya.osv import expression


class ProjectTask(models.Model):
    _inherit = "project.task"

    def action_fsm_view_material(self):
        res = super().action_fsm_view_material()
        res['domain'] = expression.AND([res['domain'], [('recurring_invoice', '=', False)]])
        return res
