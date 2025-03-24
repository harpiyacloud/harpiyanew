# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya.addons.mrp.tests.common import TestMrpCommon


class TestMrpWorkorderCommon(TestMrpCommon):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        grp_workorder = cls.env.ref('mrp.group_mrp_routings')
        cls.env.user.write({'group_ids': [(4, grp_workorder.id)]})
