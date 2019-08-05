from django.apps import AppConfig
from django.conf import settings
from .utils.utils import Territory


class ApiConfig(AppConfig):
    name = "api"
    stored_polygon = None

    def ready(self):
        if self.stored_polygon is None:
            self.stored_polygon = Territory(
                settings.PATH_TO_TERRITORY
            ).polygon()
