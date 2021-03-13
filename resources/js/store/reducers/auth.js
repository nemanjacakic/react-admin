import { createSlice } from "@reduxjs/toolkit";

import { setPageLoading } from "~/store/reducers/app";

import auth from "~/api/auth";

const slice = createSlice({
  name: "auth",
  initialState: {
    user: false,
    loggedIn: false,
  },
  reducers: {
    loginUser: (state, { payload }) => {
      state.loggedIn = true;
      state.user = payload;

      return state;
    },
    updateAuthUser: (state, { payload }) => {
      state.user = payload;

      return state;
    },
    logoutUser: (state) => {
      state.loggedIn = false;
      state.user = false;

      return state;
    }
  }
});

export default slice.reducer;

export const { loginUser, updateAuthUser, logoutUser } = slice.actions;

export function login(email, password, remember) {
  return async (dispatch) => {
    dispatch(setPageLoading(true));
    return auth.login(email, password, remember)
      .then(({data}) => {
        dispatch(loginUser(data));

        dispatch(setPageLoading(false));

        return data;
      })
      .catch(error => {
        dispatch(setPageLoading(false));

        return Promise.reject(error);
      });
  };
}

export function logout() {
  return async (dispatch) => {
    dispatch(setPageLoading(true));
    return auth.logout()
      .then(() => {
        dispatch(logoutUser());

        dispatch(setPageLoading(false));
      })
      .catch(error => {
        dispatch(setPageLoading(false));

        return Promise.reject(error);
      });
  };
}

export function setUser() {
  return async (dispatch) => {
    return auth.getUser()
      .then(({data}) => {
        dispatch(loginUser(data));

        dispatch(setPageLoading(false));
      })
      .catch(error => {
        dispatch(logoutUser());
        dispatch(setPageLoading(false));

        return Promise.reject(error);
      });
  };
}
