# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from markupsafe import Markup

from harpiya import models, fields, _


class ResUsers(models.Model):
    _inherit = 'res.users'

    harpiyabot_state = fields.Selection(
        [
            ('not_initialized', 'Not initialized'),
            ('onboarding_emoji', 'Onboarding emoji'),
            ('onboarding_attachement', 'Onboarding attachment'),
            ('onboarding_command', 'Onboarding command'),
            ('onboarding_ping', 'Onboarding ping'),
            ('onboarding_canned', 'Onboarding canned'),
            ('idle', 'Idle'),
            ('disabled', 'Disabled'),
        ], string="HarpiyaBot Status", readonly=True, required=False)  # keep track of the state: correspond to the code of the last message sent
    harpiyabot_failed = fields.Boolean(readonly=True)

    @property
    def SELF_READABLE_FIELDS(self):
        return super().SELF_READABLE_FIELDS + ['harpiyabot_state']

    def _on_webclient_bootstrap(self):
        super()._on_webclient_bootstrap()
        if self._is_internal() and self.harpiyabot_state in [False, "not_initialized"]:
            self._init_harpiyabot()

    def _init_harpiyabot(self):
        self.ensure_one()
        harpiyabot_id = self.env['ir.model.data']._xmlid_to_res_id("base.partner_root")
        channel = self.env['discuss.channel']._get_or_create_chat([harpiyabot_id, self.partner_id.id])
        message = Markup("%s<br/>%s<br/><b>%s</b> <span class=\"o_harpiyabot_command\">:)</span>") % (
            _("Hello,"),
            _("Harpiya's chat helps employees collaborate efficiently. I'm here to help you discover its features."),
            _("Try to send me an emoji")
        )
        channel.sudo().message_post(
            author_id=harpiyabot_id,
            body=message,
            message_type="comment",
            silent=True,
            subtype_xmlid="mail.mt_comment",
        )
        self.sudo().harpiyabot_state = 'onboarding_emoji'
        return channel
