# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import models
from harpiya.osv import expression


class SaleOrder(models.Model):
    _inherit = "sale.order"
    _mailing_enabled = True

    def _mailing_get_default_domain(self, mailing):
        domain = super()._mailing_get_default_domain(mailing)
        return expression.AND([domain, [('subscription_state', '=', '3_progress')]])
