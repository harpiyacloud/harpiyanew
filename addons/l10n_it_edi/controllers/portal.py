# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import _
from harpiya.exceptions import UserError
from harpiya.http import request

from harpiya.addons.account.controllers.portal import PortalAccount


class L10nITPortalAccount(PortalAccount):

    def _validate_address_values(self, address_values, *args, **kwargs):
        invalid_fields, missing_fields, error_messages = super()._validate_address_values(
            address_values, *args, **kwargs
        )

        if address_values.get('l10n_it_codice_fiscale'):
            partner_dummy = request.env['res.partner'].new({
                'l10n_it_codice_fiscale': address_values.get('l10n_it_codice_fiscale')
            })
            try:
                partner_dummy.validate_codice_fiscale()
            except UserError as e:
                invalid_fields.add('l10n_it_codice_fiscale')
                error_messages.append(e.name)

        pa_index = address_values.get('l10n_it_pa_index')
        if pa_index and (len(pa_index) < 6 or len(pa_index) > 7):
            invalid_fields.add('l10n_it_pa_index')
            error_messages.append(_("Destination Code (SDI) must have between 6 and 7 characters"))

        return invalid_fields, missing_fields, error_messages
