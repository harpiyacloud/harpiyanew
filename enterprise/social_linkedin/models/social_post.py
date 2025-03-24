# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import api, fields, models
from harpiya.osv import expression


class SocialPost(models.Model):
    _inherit = 'social.post'

    linkedin_image_ids = fields.Many2many(relation='linkedin_image_ids_rel')

    @api.depends('live_post_ids.linkedin_post_id')
    def _compute_stream_posts_count(self):
        super()._compute_stream_posts_count()

    def _get_stream_post_domain(self):
        domain = super()._get_stream_post_domain()
        linkedin_post_ids = [linkedin_post_id for linkedin_post_id in self.live_post_ids.mapped('linkedin_post_id') if linkedin_post_id]
        if linkedin_post_ids:
            return expression.OR([domain, [('linkedin_post_urn', 'in', linkedin_post_ids)]])
        else:
            return domain
