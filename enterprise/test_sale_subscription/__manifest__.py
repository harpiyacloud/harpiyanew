# Part of Harpiya. See LICENSE file for full copyright and licensing details.

{
    'name': 'Test Sale Subscription',
    'version': '1.0',
    'depends': ['sale_subscription', 'payment_demo'],
    'website': 'https://www.harpiya.com/app/accounting',
    'category': 'Sales/Subscriptions',
    'demo': ['data/sale_subscription_demo.xml'],
    'installable': True,
    'author': 'Harpiya Software Technologies, LLC',
    'license': 'OEEL-1',
    'assets': {
        'web.assets_tests': [
            'test_sale_subscription/static/tests/tours/*',
        ],
    },
}
