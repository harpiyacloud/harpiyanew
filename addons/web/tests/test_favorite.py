from harpiya.tests.common import HttpCase, tagged

@tagged('post_install', '-at_install')
class TestFavorite(HttpCase):
    def test_favorite_management(self):
        self.start_tour("/harpiya/apps", "test_favorite_management", login="admin")
