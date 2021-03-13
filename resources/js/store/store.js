import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import app from "~/store/reducers/app";
import auth from "~/store/reducers/auth";
import roles from "~/store/reducers/roles";
import users from "~/store/reducers/users";

const store = configureStore({
  reducer: combineReducers({ app, auth, roles, users }),
  middleware: [thunk]
});

export default store;
