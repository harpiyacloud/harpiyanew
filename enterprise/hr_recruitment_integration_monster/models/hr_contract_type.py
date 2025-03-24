# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import models, fields


class HrContractType(models.Model):
    _inherit = 'hr.contract.type'

    monster_id = fields.Integer(
        string='Monster ID', help='Monster ID of the contract type.')
