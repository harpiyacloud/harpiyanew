# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details

from harpiya.tests import tagged

from .common import TestCommonSalePlanning
from harpiya.addons.planning.tests.common import TestUiCommon

@tagged('post_install', '-at_install')
class TestSalePlanningUi(TestCommonSalePlanning, TestUiCommon):

    def test_01_ui_inherit(self):
        self.plannable_so.action_confirm()
        self.start_tour("/", 'sale_planning_test_tour', login='admin')
