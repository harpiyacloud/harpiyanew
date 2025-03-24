from harpiya import http
from harpiya.http import request

class IDXBrokerWebsite(http.Controller):

    @http.route(['/idxbroker/properties/json'], type='json', auth="public", website=True)
    def get_properties_json(self, link_id='5400', **kwargs):
        try:
            properties = request.env['idx.broker.api'].sudo().get_saved_link_results(link_id)
        except Exception as e:
            return {'success': False, 'error': str(e)}

        return {'success': True, 'properties': properties}
    
    @http.route(['/idxbroker/categories/json'], type='json', auth="public", website=True)
    def get_categories_json(self):
        try:
            categories = request.env['idx.broker.api'].sudo().get_categories()
        except Exception as e:
            return {'success': False, 'error': str(e)}

        return {'success': True, 'categories': categories}
    
    @http.route(['/listing/<string:listing_id>/<string:seo_url>'], type='http', auth="public", website=True, sitemap=True)
    def listing_detail(self, listing_id, seo_url, **kwargs):
        try:
            property_detail = request.env['idx.broker.api'].sudo().get_listing_detail(listing_id)

            # image verisini güvenli şekilde filtreleyelim:
            images = property_detail.get('image', {})
            if isinstance(images, dict):
                filtered_images = [
                    image_data for key, image_data in images.items()
                    if isinstance(image_data, dict) and 'url' in image_data
                ]
                # Önceliğe göre sıralama
                property_detail['filtered_images'] = sorted(
                    filtered_images, key=lambda x: x.get('priority', 0)
                )
            else:
                property_detail['filtered_images'] = []

            # Agent bilgisi
            agent_info = None
            agent_info = request.env['idx.broker.api'].sudo().get_agent_by_id()
                

        except Exception as e:
            return request.render('website.404')

        return request.render('idxbroker.property_detail_page', {
            'property': property_detail,
            'agent': agent_info
        })