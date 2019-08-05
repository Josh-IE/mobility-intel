import React from "react";
import { Message } from "semantic-ui-react";

/**
 * Renders a semantic ui message.
 */
class Notice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /** {object} contains the message content. */
      message: props.message,
      /** {boolean} controls the visibility of the message. */
      visible: true
    };
  }

  // hides the message
  handleDismiss = () => {
    /* Hides message. */
    this.setState({ visible: false });
  };

  render() {
    /* Conditionally renders the <Message/> component. */
    if (this.state.visible) {
      return (
        <Message
          style={{
            position: "absolute",
            bottom: "0",
            right: "0"
          }}
          {...this.state.message}
          onDismiss={this.handleDismiss}
        />
      );
    }
    return <span></span>;
  }
}

export default Notice;
