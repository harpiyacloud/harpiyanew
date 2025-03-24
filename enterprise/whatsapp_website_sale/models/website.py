# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import fields, models


class Website(models.Model):
    _inherit = 'website'

    wa_sale_template_id = fields.Many2one('whatsapp.template', domain=[('model', '=', 'sale.order'), ('status', '=', 'approved')])
