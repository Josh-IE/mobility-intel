import React from "react";
import { Loader } from "semantic-ui-react";

/**
 * Renders the Loader at the bottom right corner of the screen.
 */
const RequestLoader = () => (
  <Loader
    active
    inline="centered"
    style={{
      position: "absolute",
      marginTop: "50vh",
      marginLeft: "50vw",
      transform: "translate(-50%,-50%)"
    }}
  />
);

export default RequestLoader;
