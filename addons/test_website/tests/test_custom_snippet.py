# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

import harpiya.tests
from harpiya.tools import mute_logger


@harpiya.tests.common.tagged('post_install', '-at_install')
class TestCustomSnippet(harpiya.tests.HttpCase):

    @mute_logger('harpiya.addons.http_routing.models.ir_http', 'harpiya.http')
    def test_01_run_tour(self):
        self.start_tour(self.env['website'].get_client_action_url('/'), 'test_custom_snippet', login="admin")
