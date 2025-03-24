# coding: utf-8
from harpiya import fields, models


class L10n_Co_EdiPaymentOption(models.Model):
    _name = 'l10n_co_edi.payment.option'
    _description = 'Colombian Payment Options'

    code = fields.Char(string="Code")
    name = fields.Char(string="Payment Option")
