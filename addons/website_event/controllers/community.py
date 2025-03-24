# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import http
from harpiya.http import request


class EventCommunityController(http.Controller):

    @http.route('/event/<model("event.event"):event>/community', type="http", auth="public", website=True, sitemap=False)
    def community(self, event, lang=None, **kwargs):
        """ This skeleton route will be overriden in website_event_track_quiz. """
        return request.render('website.page_404')
