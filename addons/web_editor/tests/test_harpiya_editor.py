# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

import harpiya.tests

@harpiya.tests.tagged("post_install", "-at_install")
class TestHarpiyaEditor(harpiya.tests.HttpCase):

    def test_harpiya_editor_suite(self):
        self.browser_js('/web_editor/tests', "", "", login='admin', timeout=1800)
