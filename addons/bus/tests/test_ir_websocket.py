# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya.tests import tagged
from .common import WebsocketCase


@tagged("-at_install", "post_install")
class TestIrWebsocket(WebsocketCase):
    def test_only_allow_string_channels_from_frontend(self):
        with self.assertLogs("harpiya.addons.bus.websocket", level="ERROR") as log:
            ws = self.websocket_connect()
            self.subscribe(ws, [("harpiya", "discuss.channel", 5)], self.env["bus.bus"]._bus_last_id())
        self.assertIn("bus.Bus only string channels are allowed.", log.output[0])
