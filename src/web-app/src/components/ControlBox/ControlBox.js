import { Component } from "react";
import React from "react";
import { Form, Button } from "semantic-ui-react";

/**
 * Renders the form for capturing simulation parameters.
 */
class ControlBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** {object} holds the form input values. */
      params: {
        min_longitude: 13.34014892578125,
        min_latitude: 52.52791908000258,
        max_longitude: 13.506317138671875,
        max_latitude: 52.562995039558004,
        number_of_requests: 10
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {
    /**
     * updates the 'params' state when a form input is changed.
     * @param {object} event event data.
     */
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    let params = { ...this.state.params };
    params[name] = value;
    this.setState({ params });
  }

  onSubmit(event) {
    /**
     * calls the parent component onSubmit() with the state 'params' data.
     * @param {object} event event data.
     */
    event.preventDefault();
    this.props.onSubmit(this.state.params);
  }

  render() {
    /* Renders the form with preloaded state 'params' data. */
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Min Longitude"
            name="min_longitude"
            value={this.state.params.min_longitude}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            label="Min Latitude"
            name="min_latitude"
            value={this.state.params.min_latitude}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Max Longitude"
            name="max_longitude"
            value={this.state.params.max_longitude}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            label="Max Latitude"
            name="max_latitude"
            value={this.state.params.max_latitude}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            fluid
            label="Number of Requests"
            name="number_of_requests"
            value={this.state.params.number_of_requests}
            onChange={this.handleChange}
          />
        </Form.Group>
        {/* <input
          type="submit"
          id="submit"
          value="Simulate"
          className="ui primary button"
        /> */}
        <Button type="submit" id="submit" primary>
          Primary
        </Button>
      </Form>
    );
  }
}
export default ControlBox;
