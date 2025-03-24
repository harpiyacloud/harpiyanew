# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya.addons.sale.tests.common import SaleCommon


class SaleManagementCommon(SaleCommon):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()

        # Ensure user has access to sale order templates
        cls.env.user.group_ids += cls.env.ref('sale_management.group_sale_order_template')

        cls.empty_order_template = cls.env['sale.order.template'].create({
            'name': "Test Quotation Template",
        })
