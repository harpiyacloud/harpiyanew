from harpiya import api, fields, models
from harpiya.exceptions import UserError

class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    idxbroker_accesskey = fields.Char("IDX Broker Access Key", config_parameter='idxbroker_accesskey', groups='base.group_system')
    idxbroker_developer_key = fields.Char("IDX Broker Developer Key", config_parameter='idxbroker_developer_key', groups='base.group_system')
