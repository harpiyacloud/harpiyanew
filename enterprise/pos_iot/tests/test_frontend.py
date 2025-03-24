# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

import harpiya.tests
from harpiya.addons.point_of_sale.tests.test_frontend import TestPointOfSaleHttpCommon
from harpiya import Command

@harpiya.tests.tagged('post_install', '-at_install')
class TestUi(TestPointOfSaleHttpCommon):

    def test_01_pos_iot_scale(self):
        env = self.env

        # Create IoT Box
        iotbox_id = env['iot.box'].sudo().create({
            'name': 'iotbox-test',
            'identifier': '01:01:01:01:01:01',
            'ip': '1.1.1.1',
        })

        # Create IoT device
        iot_device_id = env['iot.device'].sudo().create({
            'iot_id': iotbox_id.id,
            'name': 'Scale',
            'identifier': 'test_scale',
            'type': 'scale',
            'connection': 'direct',
        })

        # Select IoT Box, tick electronic scale
        self.main_pos_config.write({
            'iface_scale_id': iot_device_id.id,
        })

        self.start_tour("/harpiya", 'pos_iot_scale_tour', login="pos_user")
