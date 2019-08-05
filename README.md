# Mobility Intelligence App

## Introduction

The mobility intelligence app is a platform that lets users simulate ride sharing acivities within the city of Berlin. The platform, powered by a simulator engine, accepts the coordinates of the region, and the number of ride sharing requests, and then returns a simulated result set of rideshare ctivities within the region. The result set contains the most popular pickup points, most popular drop off points and frequency of booking distance bins of 1km intervals for the provided region.
This platform also features a web interface for providing the simulator parameters and viewing a rendered visual analysis of the simulation results.

## Stack

The platform was built and tested against:

- Javascript Runtime: Node.js v10.16.0
- Frontend SPA: React v16.8.6
- Backend Language: Python v3.7.1
- Backend Framework: Django v2.2.3
- Backend API: Django Rest Framework v3.10.1

## Api

The simulate end point of the api receives the region coordinates and number of ride share requests as request input, validates the input, passes it on to the simulate engine, then returns the results back to the requesting client.

### Validation

The data posted via the `/simulate` endpoint is validated with the following rules.

- number_of_requests: must be an integer.

- min_longitude, max_longitude: numbers `-180<=x<=180`.

- min_latitude, max_latitude: numbers `-90<=x<=90`.

- the bounding box drawn from the coordinates must be a strict subset of the Berlin bounndaries. This implies boxes that fall outside Berlin or intersect with the Berlin boundary are considered invalid.

The api app at `/api/v1/` exposes one endpoint.

### /simulate

- POST: Returns the result of a simulation.

#### params

- number_of_requests: number of ride share requests to simulate.
- min_longitude: west border longitude of the region to simulate.
- min_latitude: south border latitude of the region to simulate.
- max_longitude: east border longitude of the region to simulate.
- max_latitude: north border latitude of the region to simulate.

#### response

```json
    {
        'booking_distance_bins': {
            'From 0->1km': 2
        }
        'most_popular_dropoff_points': {geojson}
        'most_popular_pickup_points': {geojson}
    }
```

### Perfomance

The validation that runs on every api request to check if the provided coordinates are within the Berlin region can be expensive. This is because the Berlin boundary polygon will have to be computed on every api request. To optimize this, the Berlin polygon is computed only once per app server instance (during the Django App initialization), and stored as a property of the app instance for later use, thereby eliminating the need for repeated computations on every api request.

### Simulator Modifications

The `path_to_stops` property of the `Simulator` Class was updated to a reference suited for Django. `path_to_stops = "simulator/berlin_stops.geojson"`.

### Dependencies

Django
Djanggo rest framework
cors: to whitelist react server requests

## Frontend React SPA

The web app is built with React.js and themed with the Semantic UI framework. It has 1 view with form controls that enables users provide the parameters used for simulation.

When a simulation is triggered (by clicking the `Simulate` button), a request is made to the Django api. On retrieval of the response, the simulation results are visually analysed using the 4 analytical implementations listed below.

### Analysis

#### Histogram

The histogram is used to analysze the booking distance bins, by plotting the frequency of the number of bookings against a km bin. Where each rectangle represents a km bin and its height/area represents the number of bookings within the bin.

#### Cumulative distribution frequency line

The cumulative distribution line is used in analyzing the mileage of the ride share bookings, because can displaying the number of trips that fall within a specified subset of distances. This means, visually one can discover over 50% of the bookings fell within the 0-2km distance.

#### Point cloud

The point cloud is a mapbox render that marks the the active spots(most_popular_dropoff_points and most_popular_pickup_points) in the city. This way, it is easy to tell the points of attraction within the region. The points/feature categories are differentiated by color: blue represents pickup and red dropoffs.

#### Heatmap

The heatmap is used for analyzing trip density within the given bounds. The Heatmap can be used to reveal the volume of ride share traffic density within the region.

### Development

The project is setup with create-react-app, because it includes:

- eslint with the default `react-app` lint rules.
- jest test runner
- javascript extras like spread operator(used in assinging component attributes)

The default Prettier options are used for the code editor's formatter and style linting.

## Environment Variables

- REACT_APP_MapboxAccessToken: Mapbox Access token
- REACT_APP_API_URL: Django API URL

### Dependencies

The following dependencies are required and their usage in the project context is described below:

- jstat: computing cumulative distribution (Cumulative distribution frequency line)
- requirejs: for importing modules(like jstat), that are not directly exported.
- d3: CDF and Histogram chart visualization.
- react-mapbox-gl: rendering heatmap, and pointcloud map.
- axios: client for making api requests.
- enzyme: test library. mounting components in test.

## Local Setup

You may use 2 separate terminals in local environment setup. One for running Django and the other for running Vue.js.

- clone the repository

  ```bash
  git clone https://github.com/Josh-IE/mobility-intelligence.git
  ```

- cd into the repository root

  ```bash
  cd mobility-intel
  ```

### In Django terminal

- activate your virtual environment

- install requirements

  ```bash
  pip install -r requirements.txt
  ```

- update corss settings in settings.py if need be

- run server

  ```bash
  cd src
  python manage.py runserver
  ```

### In React.js terminal

- cd into the vue app

  ```bash
  cd src/web-app
  ```

- install packages

  ```bash
  npm install
  ```

- set environment variables (.env)

  ```bash
    export REACT_APP_MapboxAccessToken=
    export REACT_APP_API_URL=http://127.0.0.1:8000/api/v1
  ```

- start development server

  ```bash
  npm start
  ```

The React.js web app and Django Api app should now be available at http://localhost:3000 and http://localhost:8000/api/v1 respectively.

## Tests

#### Django

The Django app is tested using Django TestCase Classes and they cover both the functional unit test test cases that test the utils modules and serializer class. The test case that triggers the simulate view acts as an integration test that ensures all app components communicate properly. Coverage.py is used to measure test metrics, which currently stands at 100%.

```bash
coverage run manage.py test
```

#### React

Components and utility functions are tested independently. The tests are not as detailed as they should be. More tests will be added in future commits.

Map components are tested by asserting:

- the 2 layers(pickup, dropoff) were added to the style
- its render successfully

Chart components are tested by asserting:

- the generate{chart} method is called on component mount
- it renders successfully

Form component is tested by asserting:

- the parent method handler(simulate) is called on form submission
- it renders successfully

Entry component(App.js) is tested by asserting

- it renders successfully

```bash
npm test
```
