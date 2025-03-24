# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import api, models
from harpiya.http import request


class IrHttp(models.AbstractModel):
    _inherit = 'ir.http'

    @api.model
    def get_frontend_session_info_sign(self):
        frontend_session_info = super().get_frontend_session_info()
        frontend_session_info.update({
            'user_context': request.env.context
        })
        return frontend_session_info

    @classmethod
    def _get_translation_frontend_modules_name(cls):
        mods = super()._get_translation_frontend_modules_name()
        return mods + ['sign']
