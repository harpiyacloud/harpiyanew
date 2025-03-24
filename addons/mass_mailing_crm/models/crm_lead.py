# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

from harpiya import models


class CrmLead(models.Model):
    _inherit = 'crm.lead'
    _mailing_enabled = True
