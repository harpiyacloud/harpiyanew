from harpiya.http import Controller, request, route


class HarpiyafinWebhooksController(Controller):

    @route('/webhook/harpiyafin/update_auth_exp_date', type='jsonrpc', auth='public', methods=['POST'])
    def harpiyafin_write_authorization_expiring_date(self):
        data = request.get_json_data()
        if link := request.env['account.online.link'].sudo().search([('client_id', '=', data.get('client_id'))], limit=1):
            link._update_connection_status()
        return True
