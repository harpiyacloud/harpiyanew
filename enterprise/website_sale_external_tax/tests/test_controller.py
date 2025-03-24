# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from unittest.mock import patch

from harpiya.exceptions import UserError, ValidationError
from harpiya.tests import tagged

from harpiya.addons.payment.tests.http_common import PaymentHttpCommon
from harpiya.addons.website_sale.tests.common import MockRequest, WebsiteSaleCommon
from harpiya.addons.website_sale_external_tax.controllers.main import WebsiteSaleExternalTaxCalculation


@tagged('post_install', '-at_install')
class TestWebsiteSaleExternalTaxCalculation(PaymentHttpCommon, WebsiteSaleCommon):

    def setUp(self):
        super().setUp()
        self.Controller = WebsiteSaleExternalTaxCalculation()

    def test_validate_payment_with_error_from_external_provider(self):
        """
        Payment should be blocked if external tax provider raises an error
        (invalid address, connection issue, etc ...)
        """
        with (
            patch(
                'harpiya.addons.account_external_tax.models.account_external_tax_mixin.AccountExternalTaxMixin._get_external_taxes',
                side_effect=UserError('bim bam boom')
            ),
            MockRequest(self.env, website=self.website, sale_order_id=self.empty_cart.id),
            self.assertRaisesRegex(ValidationError, 'bim bam boom')
        ):
            self.Controller.shop_payment_validate()
