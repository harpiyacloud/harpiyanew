# Part of Harpiya. See LICENSE file for full copyright and licensing details.

import logging

import harpiya.modules.db

from . import models
from . import report

_logger = logging.getLogger(__name__)


def post_init(env):
    # if not registry.has_unaccent: # FIXME: harpiya/harpiya#347
    if not harpiya.modules.db.has_unaccent(env.cr):
        _logger.warning('pg extension "unaccent" not loaded, deduplication rules of type "accent" will be treated as "exact"')


def uninstall_hook(env):
    """ This method will remove all the server actions used for 'Merge Action' in the contextual menu. """
    models_to_clean = env['ir.model'].search([('ref_merge_ir_act_server_id', '!=', False)])
    actions_to_remove = models_to_clean.mapped('ref_merge_ir_act_server_id')
    actions_to_remove.unlink()
