# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import fields, models


class CalendarAlarm(models.Model):
    _inherit = "calendar.alarm"

    default_for_new_appointment_type = fields.Boolean(
        "New Appointments Default", help="Use as default for new Appointment Types")
