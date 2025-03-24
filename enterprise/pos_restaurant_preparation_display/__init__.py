from . import models
from harpiya.tools import convert

def _pos_restaurant_preparation_display_post_init(env):
    env['pos.config']._init_preparation_display_data()
