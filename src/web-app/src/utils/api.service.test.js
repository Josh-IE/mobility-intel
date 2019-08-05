import SimulateService from "../utils/api.service";

it("api service should return expected data structure for coordinates within Berlin", () => {
  let data = {
    min_longitude: 13.34014892578125,
    min_latitude: 52.52791908000258,
    max_longitude: 13.506317138671875,
    max_latitude: 52.562995039558004,
    number_of_requests: 5
  };
  return SimulateService.simulate(data).then(response => {
    expect(typeof response).toEqual("object");
    expect(response).toHaveProperty("data");
    expect(response.data).toHaveProperty("booking_distance_bins");
    expect(response.data).toHaveProperty("most_popular_dropoff_points");
    expect(response.data).toHaveProperty("most_popular_pickup_points");
  });
});

it("api service should return error if coordinates are not within Berlin", () => {
  let data = {
    min_longitude: 13.400574,
    min_latitude: 52.361345,
    max_longitude: 13.558502,
    max_latitude: 52.421685,
    number_of_requests: 5
  };
  return SimulateService.simulate(data).catch(error => {
    expect(error.response.status).toEqual(400);
    expect(error.response.data).toHaveProperty("out_of_bounds");
  });
});
