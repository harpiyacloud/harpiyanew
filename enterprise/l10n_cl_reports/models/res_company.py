# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import models, fields


class ResCompany(models.Model):
    _inherit = 'res.company'

    l10n_cl_report_tasa_ppm = fields.Float(string="PPM rate (%)")
    l10n_cl_report_fpp_value = fields.Float(string="FPP (%)")
