import { Component } from "react";
import React from "react";
import ReactMapGL from "react-map-gl";
import { Header } from "semantic-ui-react";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  circleLayer,
  defaultMapStyle,
  setLayerStyle,
  generateMapStyle
} from "../../map/map";

const TOKEN = process.env.REACT_APP_MapboxAccessToken;

/**
 * Renders a mapbox point cloud using most_popular_dropoff_points and most_popular_pickup_points
 * geojson data. 2 unique colors are used to differentiate the two categories of points.
 */
class Point extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** {object} mapStyle Mapbox style. */
      mapStyle: defaultMapStyle,
      /** {object} viewport Mapbox component (<ReactMapGL/>) props. */
      viewport: props.viewport
    };
  }

  /* {object} paintProperties Object containing a mapping of metrics => to their respective paint properties. */
  paintProperties = this.props.paintProperties;
  /** {object}  mobilityData Object containing a mapping of metrics => to their respective geojson data. */
  mobilityData = this.props.mobilityData;

  generatePointsMap() {
    /**
     * Generates a point cloud map using layer paint properties and geojson position data.
     */

    let metrics = Object.keys(this.paintProperties);

    let mapStyle = defaultMapStyle;
    // generates a new map style, using {defaultMapStyle} as base
    // TODO: use a recursive function to generate a map style using the current map style
    metrics.forEach(metric => {
      // creates a point layer
      let layer = circleLayer(metric, true);
      // styles the point layer
      layer = setLayerStyle(layer, this.paintProperties[metric]);
      // gets the geojson points data for the current '{metric}' in the loop
      let pointsData = JSON.parse(this.mobilityData[metric]);
      // generates a mapstyle based on previous value of {mapStyle} using the geojson points and styled layer
      mapStyle = generateMapStyle(mapStyle, metric, pointsData, layer);
    });

    // updates the rendered mapbox state, with the generated styles
    this.setState({ mapStyle });
  }

  componentDidMount() {
    // generates map based on state data
    this.generatePointsMap();
  }

  // updates {viewport} state when onViewportChange() is called in child <ReactMapGL/>
  _onViewportChange = viewport => this.setState({ viewport });

  render() {
    const { viewport, mapStyle } = this.state;
    return (
      <div
        style={{
          marginTop: "20px"
        }}
      >
        <Header as="h2">Point Cloud</Header>
        {/* Renders the mapbox component. */}
        <ReactMapGL
          {...viewport}
          mapStyle={mapStyle}
          mapboxApiAccessToken={TOKEN}
          onViewportChange={this._onViewportChange}
        />
      </div>
    );
  }
}

export default Point;
