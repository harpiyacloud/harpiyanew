# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import api, models


class AccountPaymentMethod(models.Model):
    _inherit = 'account.payment.method'

    @api.model
    def _get_payment_method_information(self):
        res = super()._get_payment_method_information()
        res['sdd'] = {'mode': 'multi', 'type': ('bank',)}
        return res

    @api.model
    def _get_sdd_payment_method_code(self):
        res = super()._get_sdd_payment_method_code()
        res.append('sdd')
        return res
