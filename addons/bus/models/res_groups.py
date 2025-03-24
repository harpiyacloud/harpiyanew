# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import models


class ResGroups(models.Model):
    _name = 'res.groups'
    _inherit = ["res.groups", "bus.listener.mixin"]
