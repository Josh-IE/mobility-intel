import React from "react";
import { Container } from "semantic-ui-react";
import ControlBox from "./components/ControlBox/ControlBox";
import Point from "./components/Point/Point";
import Heatmap from "./components/Heatmap/Heatmap";
import Histogram from "./components/Histogram/Histogram";
import CDFChart from "./components/CDFChart/CDFChart";
import SimulateService from "./utils/api.service";
import RequestLoader from "./components/RequestLoader";
import Notice from "./components/Notice";

/**
 * App Entry component. Renders a simulation control form and its visual analysis.
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /** {boolean} controls the rendering condition of the <RequestLoader/>. */
      fetching: false,
      /** {boolean} controls the rendering condition of the <Notice/>. */
      messageVisible: false
    };
  }

  /** Mapbox viewport attributes.
   * Passed as a prop to <Point/> & <Heatmap/>.
   */
  viewport = {
    width: 960,
    height: 400,
    latitude: 52.5072,
    longitude: 13.4248,
    zoom: 10
  };

  /** Point paint properties of all the metrics to be visualised.
   * Passed as a prop to <Point/>.
   * NB: Only metrics with paint properties are visualised.
   */
  pointPaintProperties = {
    most_popular_dropoff_points: {
      "circle-color": "#ff0000",
      "circle-radius": 7
    },
    most_popular_pickup_points: {
      "circle-color": "#9333FF",
      "circle-radius": 7
    }
  };

  /** Heatmap paint properties of all the metrics to be visualised.
   * Passed as a prop to <Heatmap/>.
   * NB: Only metrics with paint properties are visualised.
   */
  heatmapPaintProperties = {
    most_popular_dropoff_points: {
      "heatmap-weight": 1,
      "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 10, 2, 20, 4],
      "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 25, 25],
      "heatmap-opacity": 0.75
    },
    most_popular_pickup_points: {
      "heatmap-weight": 1,
      "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 10, 2, 20, 4],
      "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 25, 25],
      "heatmap-opacity": 0.75
    }
  };

  /** Histogram frame pixel dimensions.
   * Passed as a prop to <Histogram/>.
   */
  histogramDimension = {
    width: 960,
    height: 360
  };

  /** CDFChart frame pixel dimensions.
   * Passed as a prop to <CDFChart/>.
   */
  cdfDimension = {
    width: 960,
    height: 360
  };

  errorMessage = () =>
    /**
     * Object literal that returns api request error message object.
     * @return {object} Error message object.
     */
    ({
      header: "Request Error",
      content: "Bad Request",
      compact: true,
      negative: true
    });

  displayMessage(message) {
    /**
     * Displays message.
     * @param {object} message Message object.
     */
    // displays message
    this.setState({ message, messageVisible: true });

    // hides message after 3 seconds
    setTimeout(() => {
      this.setState({ messageVisible: false });
    }, 3000);
  }

  simulate = params => {
    /**
     * Calls the SimulateService and updates the state with the returned data.
     * Triggered by the child <ControlBox/> compponent.
     */
    // displays loader
    this.setState({ fetching: true });
    SimulateService.simulate(params)
      .then(response => {
        let mobilityData = response.data;
        // updates state, hides loader
        this.setState({ mobilityData, fetching: false });
      })
      .catch(error => {
        this.displayMessage(this.errorMessage());
        // hides loader
        this.setState({ fetching: false });
        console.log(error);
        // console.log(error.response.data);
      });
  };

  render() {
    /* Conditionally renders the sub components that makeup the app. */
    return (
      <div>
        <Container>
          {/* Renders the loader if fetching state is true */}
          {this.state && this.state.fetching && <RequestLoader />}
          {/* Renders the Control Box form component */}
          <ControlBox onSubmit={this.simulate} />
          {/* Renders the Histogram chart component if its data is available */}
          {this.state && this.state.mobilityData && (
            <Histogram
              mobilityData={this.state.mobilityData.booking_distance_bins}
              dimension={this.histogramDimension}
            />
          )}
          {/* Renders the Heatmap mapbox component if its data is available */}
          {this.state && this.state.mobilityData && (
            <Heatmap
              mobilityData={this.state.mobilityData}
              paintProperties={this.heatmapPaintProperties}
              viewport={this.viewport}
            />
          )}
          {/* Renders the Point cloud mapbox component if its data is available */}
          {this.state && this.state.mobilityData && (
            <Point
              mobilityData={this.state.mobilityData}
              paintProperties={this.pointPaintProperties}
              viewport={this.viewport}
            />
          )}
          {/* Renders the CDF chart component if its data is available */}
          {this.state && this.state.mobilityData && (
            <CDFChart
              mobilityData={this.state.mobilityData.booking_distance_bins}
              dimension={this.cdfDimension}
            />
          )}
          {/* Renders the Notice component if messageVisible state is true */}
          {this.state && this.state.messageVisible && (
            <Notice message={this.state.message} />
          )}
        </Container>
      </div>
    );
  }
}

export default App;
