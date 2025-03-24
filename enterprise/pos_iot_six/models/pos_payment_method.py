# coding: utf-8
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import models


class PosPaymentMethod(models.Model):
    _inherit = 'pos.payment.method'

    def _get_payment_terminal_selection(self):
        return super()._get_payment_terminal_selection() + [('six_iot', 'SIX')]
