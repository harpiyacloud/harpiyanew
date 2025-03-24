# -*- coding: utf-8 -*-
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

import harpiya

# ----------------------------------------------------------
# Monkey patch release to set the edition as 'enterprise'
# ----------------------------------------------------------
harpiya.release.version_info = harpiya.release.version_info[:5] + ('e',)
if '+e' not in harpiya.release.version:     # not already patched by packaging
    harpiya.release.version = '{0}+e{1}{2}'.format(*harpiya.release.version.partition('-'))

harpiya.service.common.RPC_VERSION_1.update(
    server_version=harpiya.release.version,
    server_version_info=harpiya.release.version_info)
