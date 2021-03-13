import axios from "axios";

export default {
  get(id) {
    return axios
      .get("users/" + id)
      .then(({ data }) => {
        return data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },
  getAll(params) {
    return axios
      .get("users", { params })
      .then(({ data }) => {
        return data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },
  store({...data}) {
    return axios
      .post("users", data)
      .then(({ data }) => {
        return data;
      })
      .catch(({ response }) => {
        return Promise.reject(response.data);
      });
  },
  update({ id, ...data }) {
    return axios
      .put("users/" + id, data)
      .then(({ data }) => {
        return data;
      })
      .catch(({ response }) => {
        return Promise.reject(response.data);
      });
  },
  destroy(id) {
    return axios
      .delete("users/" + id)
      .then(({ data }) => {
        return data.data;
      })
      .catch(({ response }) => {
        return Promise.reject(response.data);
      });
  }
};
