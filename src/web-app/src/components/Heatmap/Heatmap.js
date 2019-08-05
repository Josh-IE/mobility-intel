import React from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Header } from "semantic-ui-react";
import {
  defaultMapStyle,
  heatmapLayer,
  setLayerStyle,
  generateMapStyle
} from "../../map/map";

const TOKEN = process.env.REACT_APP_MapboxAccessToken;

class Heatmap extends React.Component {
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

  generateHeatmap() {
    /**
     * Generates a heatmap using layer paint properties and geojson position data.
     */

    // console.log(mobilityData);
    // console.log(mapStyle.toJS().sources.heatmapcol)
    // console.log(mapStyle.toJS().layers[24])

    let metrics = Object.keys(this.paintProperties);

    let mapStyle = defaultMapStyle;
    // generates a new map style, using {defaultMapStyle} as base
    // TODO: use a recursive function to generate a map style using the current map style
    metrics.forEach(metric => {
      // creates a heatmap layer
      let layer = heatmapLayer(metric, true);
      // styles the heatmap layer
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
    this.generateHeatmap();
  }

  // updates {viewport} state when onViewportChange() is called in child <ReactMapGL/>
  _onViewportChange = viewport => this.setState({ viewport });

  render() {
    const { viewport, mapStyle } = this.state;
    return (
      <div>
        <Header as="h2">Heatmap</Header>
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

export default Heatmap;
