# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import fields, models


class FleetVehicleState(models.Model):
    _inherit = 'fleet.vehicle.state'

    hide_in_offer = fields.Boolean()
