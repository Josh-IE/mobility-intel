import Axios from "axios";

// axios settings
Axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const RESOURCE_NAME = "/simulate";

export default {
  /**
   * simulate() returns an axios request promise object that retrieves simulated results.
   * @param {object} data  box coordinates json object.
   * @return {Promise} POST request Promise object.
   */
  simulate(data) {
    return Axios.post(`${RESOURCE_NAME}/`, data);
  }
};
