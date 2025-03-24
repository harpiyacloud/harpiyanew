# ruff: noqa: E402, F401
# Part of Harpiya. See LICENSE file for full copyright and licensing details.

""" Harpiya initialization. """

import sys
from .release import MIN_PY_VERSION
assert sys.version_info > MIN_PY_VERSION, f"Outdated python version detected, Harpiya requires Python >= {'.'.join(map(str, MIN_PY_VERSION))} to run."

# ----------------------------------------------------------
# Import tools to patch code and libraries
# required to do as early as possible for evented and timezone
# ----------------------------------------------------------
from . import _monkeypatches
_monkeypatches.patch_all()

# ----------------------------------------------------------
# Shortcuts
# Expose them at the `harpiya` namespace level
# ----------------------------------------------------------
import harpiya
from .orm.commands import Command
from .orm.utils import SUPERUSER_ID
from .tools.translate import _, _lt

harpiya.SUPERUSER_ID = SUPERUSER_ID
harpiya._ = _
harpiya._lt = _lt
harpiya.Command = Command
