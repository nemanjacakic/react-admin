/*global process*/

import axios from "axios";

export default {
  csrf() {
    return axios
      .get("/sanctum/csrf-cookie", {
        baseURL: process.env.MIX_SERVER_BASE_AUTH_URL
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },
  getUser() {
    return axios
      .post("auth/me")
      .then(({ data }) => {
        return data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },
  login(email, password, remember) {
    return this.csrf().then(() => {
      return axios
        .post(
          "login",
          {
            email,
            password,
            remember
          },
          {
            baseURL: process.env.MIX_SERVER_BASE_AUTH_URL
          }
        )
        .then(({ data }) => {
          return data;
        })
        .catch(error => {
          return Promise.reject(error);
        });
    });
  },
  logout() {
    return axios
      .post(
        "logout",
        {},
        {
          baseURL: process.env.MIX_SERVER_BASE_AUTH_URL
        }
      )
      .then(({ data }) => {
        return data.data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
};
