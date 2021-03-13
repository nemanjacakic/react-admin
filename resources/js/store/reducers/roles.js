import { createSlice } from "@reduxjs/toolkit";

import roles from "~/api/roles";

const slice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
  },
  reducers: {
    setRoles: (state, { payload }) => {
      state.roles = payload;

      return state;
    }
  }
});

export default slice.reducer;

export const { setRoles } = slice.actions;

export function getAll(params) {
  return async (dispatch) => {
    return roles.getAll(params)
      .then((response) => {
        dispatch(setRoles(response.data));

        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
}

