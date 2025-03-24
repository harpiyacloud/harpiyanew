# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya.http import route

from harpiya.addons.sale.controllers.product_configurator import (
    SaleProductConfiguratorController,
)
from harpiya.addons.sale_renting.controllers.utils import _convert_rental_dates


class SaleRentingProductConfiguratorController(SaleProductConfiguratorController):

    @route()
    def sale_product_configurator_get_values(self, *args, **kwargs):
        _convert_rental_dates(kwargs)
        return super().sale_product_configurator_get_values(*args, **kwargs)

    @route()
    def sale_product_configurator_update_combination(self, *args, **kwargs):
        _convert_rental_dates(kwargs)
        return super().sale_product_configurator_update_combination(*args, **kwargs)

    @route()
    def sale_product_configurator_get_optional_products(self, *args, **kwargs):
        _convert_rental_dates(kwargs)
        return super().sale_product_configurator_get_optional_products(*args, **kwargs)
