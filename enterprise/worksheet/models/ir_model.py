# Part of Harpiya. See LICENSE file for full copyright and licensing details.
from harpiya import models


class IrModel(models.Model):
    _inherit = 'ir.model'

    def unlink(self):
        self.env['worksheet.template'].search([('model_id', 'in', self.ids)]).unlink()
        return super().unlink()
