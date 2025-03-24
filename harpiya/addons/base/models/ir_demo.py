# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import models
from harpiya.addons.base.models.ir_module import assert_log_admin_access


class IrDemo(models.TransientModel):
    _name = 'ir.demo'
    _description = 'Demo'

    @assert_log_admin_access
    def install_demo(self):
        import harpiya.modules.loading  # noqa: PLC0415
        harpiya.modules.loading.force_demo(self.env)
        return {
            'type': 'ir.actions.act_url',
            'target': 'self',
            'url': '/harpiya',
        }
