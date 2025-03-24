# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya.addons.sale.tests.common import SaleCommon


class SaleRentingCommon(SaleCommon):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()

        Recurrence = cls.env['sale.temporal.recurrence']
        cls.recurrence_hour = Recurrence.create({'duration': 1, 'unit': 'hour'})
        cls.recurrence_day = Recurrence.create({'duration': 1, 'unit': 'day'})

    @classmethod
    def _create_product(cls, **kwargs):
        if 'rent_ok' not in kwargs:
            kwargs['rent_ok'] = True
        return super()._create_product(**kwargs)
