from django.test import TestCase
from rest_framework.exceptions import ValidationError

from ..v1 import serializers


class SimulateSerializerTestCase(TestCase):
    """
    Unit tests for the Simulate serializer.
    """

    def test_coordinates_within_berlin_pass(self):
        """
        serializer is valid with the intended berlin coordinates
        """
        data = {
            "min_longitude": 13.34014892578125,
            "min_latitude": 52.52791908000258,
            "max_longitude": 13.506317138671875,
            "max_latitude": 52.56299503955800,
            "number_of_requests": 5,
        }
        serializer = serializers.SimulateSerializer(data=data)
        assert True is serializer.is_valid()

    def test_coordinates_not_within_berlin_fail(self):
        """
        serializer validation fails with coordinates outside berlin.
        """
        data = {
            "min_longitude": 12.34014892578125,
            "min_latitude": 52.52791908000258,
            "max_longitude": 13.506317138671875,
            "max_latitude": 52.56299503955800,
            "number_of_requests": 5,
        }
        serializer = serializers.SimulateSerializer(data=data)
        assert False is serializer.is_valid()
        self.assertIn("out_of_bounds", serializer.errors)
        msg = "The boundary box is not within Berlin."
        with self.assertRaisesMessage(ValidationError, msg):
            serializer.is_valid(raise_exception=True)
