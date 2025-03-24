# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya.tests import HttpCase, tagged
from harpiya import tools


@tagged('post_install', '-at_install')
class TestUi(HttpCase):

	# Avoid "A Chart of Accounts is not yet installed in your current company."
	# Everything is set up correctly even without installed CoA
    @tools.mute_logger('harpiya.http')
    def test_01_point_of_sale_tour(self):

        self.start_tour("/harpiya", 'point_of_sale_tour', login="admin")
