import json

from django.apps import apps

from shapely.geometry import box, shape


class Territory:
    """
    Class to define a geographical territory
    """

    def __init__(self, path_to_geojson):
        self.path_to_geojson = path_to_geojson

    def polygon(self):
        """
        Generates and returns polygon of the Territory.
        """
        polygon = shape(json.loads(open(self.path_to_geojson).read()))
        return polygon


def tuple_from_dict(value):
    """Returns tuple of dictionary values.

    Args:
        value (dict):
    Returns:
        tuple
    """
    dict_values = value.values()
    return tuple(dict_values)


def get_stored_polygon():
    # get the instance of api app config that was initialised
    # during server startup.
    api_app_config = apps.get_app_config("api")
    # retrieve stored computed polygon
    stored_polygon = api_app_config.stored_polygon
    return stored_polygon


def is_within_territory(box_coordinates):
    """Checks if arbitrary box coordinates is within a Territory.

    Args:
        box_coordinates (tuple):
    Returns:
        Bool whether box is in polygon.

    Depends on self.stored_polygon (MultiPolygon) being instatiated
    in app initialization.
    """
    box_tuple = tuple_from_dict(box_coordinates)
    stored_polygon = get_stored_polygon()
    bbox = box(*box_tuple)
    return bbox.within(stored_polygon)
