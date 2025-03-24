# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import _
from harpiya.addons.project.controllers.portal import ProjectCustomerPortal

class ProjectPortal(ProjectCustomerPortal):
    def _task_get_searchbar_sortings(self, milestones_allowed, project=False):
        return super()._task_get_searchbar_sortings(milestones_allowed, project) | {
            'planned_date_begin asc': {'label': _('Planned Date'), 'sequence': 70},
        }
