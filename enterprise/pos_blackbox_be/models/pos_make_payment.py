# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import models
from harpiya.exceptions import UserError
from harpiya.tools.translate import _


class PosMakePayment(models.TransientModel):
    _inherit = "pos.make.payment"

    def check(self):
        order = self.env["pos.order"].browse(self.env.context.get("active_id"))

        if order.config_id.iface_fiscal_data_module:
            raise UserError(
                _("Adding additional payments to registered orders is not allowed.")
            )

        return super().check()
