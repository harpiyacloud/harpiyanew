# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya.http import request, route

from harpiya.addons.website_sale.controllers.cart import Cart as WebsiteSaleCart


class Cart(WebsiteSaleCart):

    @route()
    def cart(self, **post):
        if order_sudo := request.cart:
            order_sudo._update_programs_and_rewards()
            order_sudo._auto_apply_rewards()
        return super().cart(**post)
