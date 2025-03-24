  # -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import  api, fields, models


class PosConfig(models.Model):
    _inherit = 'pos.config'

    appointment_type_id = fields.Many2one('appointment.type', string='Appointment Type')

    @api.depends('appointment_type_id')
    def _compute_local_data_integrity(self):
       super()._compute_local_data_integrity()
