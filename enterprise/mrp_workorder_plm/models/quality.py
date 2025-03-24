# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import models


class QualityPoint(models.Model):
    _inherit = "quality.point"

    def _get_sync_values(self):
        if not self:
            return tuple()
        self.ensure_one()
        return (self.test_type_id, self.title, self.component_id)
