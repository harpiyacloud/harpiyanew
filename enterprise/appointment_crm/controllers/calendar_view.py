# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya.addons.appointment.controllers.calendar_view import AppointmentCalendarView
from harpiya.http import request
from harpiya.osv.expression import AND


class AppointmentCrmCalendarView(AppointmentCalendarView):

    @classmethod
    def _get_staff_user_appointment_invite_domain(cls, appointment_type, user):
        domain = super()._get_staff_user_appointment_invite_domain(appointment_type, user)
        if 'default_opportunity_id' in request.env.context:
            domain = AND([domain, [('opportunity_id', '=', request.env.context['default_opportunity_id'])]])
        return domain
