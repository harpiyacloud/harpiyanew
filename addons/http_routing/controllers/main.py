# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import http
from harpiya.http import request
from harpiya.addons.web.controllers.home import Home
from harpiya.addons.web.controllers.session import Session
from harpiya.addons.web.controllers.webclient import WebClient


class Routing(Home):

    @http.route('/website/translations/<string:unique>', type='http', auth="public", website=True, readonly=True)
    def get_website_translations(self, unique, lang=None, mods=None):
        IrHttp = request.env['ir.http'].sudo()
        modules = IrHttp.get_translation_frontend_modules()
        if mods:
            modules += mods.split(',')
        return WebClient().translations(unique, mods=','.join(modules), lang=lang)


class SessionWebsite(Session):

    @http.route('/web/session/logout', website=True, multilang=False, sitemap=False)
    def logout(self, redirect='/harpiya'):
        return super().logout(redirect=redirect)
