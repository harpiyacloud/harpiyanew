# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya.addons.website_helpdesk.controllers.main import WebsiteHelpdesk
from harpiya.addons.website_knowledge.controllers.main import KnowledgeWebsiteController

from harpiya.http import request, route
from harpiya.tools import config


class WebsiteHelpdeskKnowledge(WebsiteHelpdesk):

    def _format_search_results(self, search_type, records, options):
        if search_type != 'knowledge':
            return super()._format_search_results(search_type, records, options)
        return [{
            'template': 'website_helpdesk_knowledge.search_result',
            'record': article,
            'url': article.website_url,
            'icon': 'fa-book',
        } for article in records]

    def _get_knowledge_base_values(self, team):
        return {
            **super()._get_knowledge_base_values(team),
            'target': '_self' if config['test_enable'] else '_blank',  # TODO use harpiya.modules.module.current_test? (after it is not disabled for mails)
        }

class WebsiteKnowledgeHelpdesk(KnowledgeWebsiteController):

    @route('/helpdesk/<model("helpdesk.team"):team>/knowledge/home', type='http', auth='public', website=True, sitemap=False)
    def access_helpdesk_knowledge_home(self, team=None, **kwargs):
        if not team or not team.website_article_id:
            return request.redirect('/knowledge/home')
        article = team.website_article_id
        return self.redirect_to_article(article_id=article.id)
