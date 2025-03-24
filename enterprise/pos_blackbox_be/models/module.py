# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import models
from harpiya.exceptions import UserError
from harpiya.tools.translate import _


class IrModuleModule(models.Model):
    _inherit = "ir.module.module"

    def module_uninstall(self):
        for module_to_remove in self:
            if module_to_remove.name == "pos_blackbox_be":
                raise UserError(_("This module is not allowed to be removed."))

        return super().module_uninstall()
