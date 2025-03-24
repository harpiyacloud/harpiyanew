# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import fields, models


class HrDepartureReason(models.Model):
    _inherit = "hr.departure.reason"

    l10n_hk_ir56f_code = fields.Char()
