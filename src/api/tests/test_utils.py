from django.apps import apps
from django.test import TestCase

from ..utils import utils


class UtilsTestCase(TestCase):
    """
    Unit tests for the Utils module.
    """

    def test_tuple_from_dict(self):
        """
        The tuple_from_dict function should return a tuple of the dict values.
        """
        sample_dict = {
            "min_longitude": 120,
            "min_latitude": -30,
            "max_longitude": 179,
            "max_latitude": 89,
        }
        expected_tuple = (120, -30, 179, 89)
        result = utils.tuple_from_dict(sample_dict)
        self.assertEqual(expected_tuple, result)

    def test_get_stored_polygon(self):
        """
        The get_stored_polygon function should return the territory polygon
        saved during app initialization.
        """
        api_app_config = apps.get_app_config("api")
        expected_polygon = api_app_config.stored_polygon
        result = utils.get_stored_polygon()
        self.assertEqual(expected_polygon, result)

    def test_polygon_is_stored_during_app_initialization(self):
        """
        The app instance 'stored_polygon' property should be available
        during/after the app's initialization.
        """
        api_app_config = apps.get_app_config("api")
        # trigger the app ready call to mock server reinitialization
        api_app_config.ready()
        # check that the polygon is not None
        self.assertIsNot(api_app_config.stored_polygon, None)

    def test_box_not_within_territory(self):
        """
        The is_within_territory function returns False if box is not within the
        territory saved during app initialization.
        """
        bbox = {
            "min_longitude": 13.400574,
            "min_latitude": 52.361345,
            "max_longitude": 13.558502,
            "max_latitude": 52.421685,
        }
        result = utils.is_within_territory(bbox)
        self.assertEqual(False, result)

    def test_is_within_territory(self):
        """
        The 'is_within_territory' function should return True if box is within
        the territory saved during app initialization.
        """
        bbox = {
            "min_longitude": 13.387399,
            "min_latitude": 52.511285,
            "max_longitude": 13.394437,
            "max_latitude": 52.513714,
        }
        result = utils.is_within_territory(bbox)
        self.assertEqual(True, result)
