import axios from "axios";

export default {
  getAll() {
    return axios
      .get("roles")
      .then(({ data }) => {
        return data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
};
