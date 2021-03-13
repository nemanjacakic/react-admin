import axios from "axios";

axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json",
  Accept: "application/json"
};

/*global process*/
axios.defaults.baseURL = process.env.MIX_SERVER_BASE_API_URL;
axios.defaults.withCredentials = true;
