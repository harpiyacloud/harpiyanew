#  Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import models, fields


class UoM(models.Model):
    _inherit = 'uom.uom'

    fedex_code = fields.Char(string='Fedex Code', help="UoM Code sent to FedEx")
