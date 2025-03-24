# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya.tests.common import HttpCase, tagged

from harpiya.addons.account.tests.common import AccountTestInvoicingCommon


@tagged('post_install', '-at_install')
class TestUi(AccountTestInvoicingCommon, HttpCase):

    def test_01_sale_tour(self):
        self.env.ref('base.user_admin').write({
            'email': 'mitchell.admin@example.com',
        })
        self.env['res.partner'].create({'name': 'Agrolait', 'email': 'agro@lait.be'})
        self.start_tour("/harpiya", 'sale_tour', login="admin")
