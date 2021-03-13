import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "~/store/store";

import "~/bootstrap";

import CssBaseline from "@material-ui/core/CssBaseline";
import App from "~/App";

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
  document.getElementById("root")
);
