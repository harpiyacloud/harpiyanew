# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import http

proxy_drivers = {}

class ProxyController(http.Controller):
    @http.route('/hw_proxy/hello', type='http', auth='none', cors='*')
    def hello(self):
        return "ping"

    @http.route('/hw_proxy/handshake', type='jsonrpc', auth='none', cors='*')
    def handshake(self):
        return True

    @http.route('/hw_proxy/status_json', type='jsonrpc', auth='none', cors='*')
    def status_json(self):
        statuses = {}
        for driver in proxy_drivers:
            statuses[driver] = proxy_drivers[driver].get_status()
        return statuses
