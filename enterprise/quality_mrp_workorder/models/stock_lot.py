# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import models
from harpiya.osv import expression


class StockLot(models.Model):
    _inherit = 'stock.lot'

    def _get_quality_check_domain(self, prod_lot):
        domain = super()._get_quality_check_domain(prod_lot)
        domain = expression.OR([domain, [('finished_lot_id', 'in', prod_lot.ids)]])
        return domain
