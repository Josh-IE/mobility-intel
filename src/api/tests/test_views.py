from django.test import TestCase
from django.test import Client
from rest_framework import status


class SimulateViewTest(TestCase):
    """
    tests for the Simulate view.
    """

    def setUp(self):
        self.client = Client()
        self.valid_payload = {
            "min_longitude": 13.34014892578125,
            "min_latitude": 52.52791908000258,
            "max_longitude": 13.506317138671875,
            "max_latitude": 52.56299503955800,
            "number_of_requests": 5,
        }
        self.invalid_payload = {
            "min_longitude": 12.34014892578125,
            "min_latitude": 52.52791908000258,
            "max_longitude": 13.506317138671875,
            "max_latitude": 52.56299503955800,
            "number_of_requests": 5,
        }

    def test_retrieve_simulate_results(self):
        """
        A 200 status is returned by the Simulate view
        when passed valid request data.
        """
        response = self.client.post(
            "/api/v1/simulate/", data=self.valid_payload
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_field_keys = set(
            [
                "booking_distance_bins",
                "most_popular_dropoff_points",
                "most_popular_pickup_points",
            ]
        )
        self.assertEqual(expected_field_keys, set(response.data.keys()))

    def test_retrieve_simulate_results_out_of_bound_region(self):
        """
        A 400 error is returned by the Simulate view
        when passed valid coordinates.
        """
        response = self.client.post(
            "/api/v1/simulate/", data=self.invalid_payload
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("out_of_bounds", response.data)
        self.assertIn(
            "The boundary box is not within Berlin.",
            response.data["out_of_bounds"][0],
        )
