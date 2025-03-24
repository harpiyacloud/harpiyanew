import requests
from harpiya import api, fields, models
from harpiya.exceptions import UserError

class IDXBrokerAPI(models.AbstractModel):
    _name = 'idx.broker.api'
    _description = 'IDX Broker API Helper'

    @api.model
    def _get_headers(self):
        # Parametreleri doğrudan res.config.settings üzerinden alın.
        Params = self.env['ir.config_parameter'].sudo()
        
        access_key = Params.get_param('idxbroker_accesskey')
        developer_key = Params.get_param('idxbroker_developer_key')

        if not access_key or not developer_key:
            raise UserError("IDX Broker API anahtarları eksik veya tanımlanmamış!")

        headers = {
            'Content-Type': 'application/json',
            'accesskey': access_key,
            'ancillarykey': developer_key,
            'outputtype': 'json',
            'apiversion': '1.8.0',
            
        }
        return headers

    @api.model
    def get_saved_link_results(self, link_id):
        url = f"https://api.idxbroker.com/clients/savedlinks/{link_id}/results"
        headers = self._get_headers()

        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            raise UserError(f"IDX Broker API Hatası: {response.status_code} - {response.text}")
        
        print(response.json())

        return response.json()
    
    @api.model
    def get_categories(self):
        url = "https://api.idxbroker.com/clients/savedlinks"
        headers = self._get_headers()

        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            raise UserError(f"IDX Broker API Error: {response.status_code} - {response.text}")

        data = response.json()
        print("Yasir")
        print(data)
        # Kategorileri IDX Broker API yapısına göre döndürün.
        categories = [{'id': cat['id'], 'name': cat['linkTitle']} for cat in data]
        return categories
    
    @api.model
    def get_listing_detail(self, listing_id):
        headers = self._get_headers()
        url = f"https://api.idxbroker.com/clients/listing/b004/{listing_id}"

        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            raise UserError(f"IDX Broker Detail API Hatası: {response.status_code} - {response.text}")

        return response.json()
    
    @api.model
    def get_agent_by_id(self):
        headers = self._get_headers()
        url = "https://api.idxbroker.com/clients/agents"

        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            raise UserError(f"IDX Broker Agent API Hatası: {response.status_code} - {response.text}")

        data = response.json()
        agents = data.get('agent', [])
        print(data)
        for agent in agents:
            if str(agent.get("listingAgentID")):
                return agent
        return None
