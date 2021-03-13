import { createSlice } from "@reduxjs/toolkit";

import users from "~/api/users";

const slice = createSlice({
  name: "users",
  initialState: {
    users: [],
    usersMeta: {}
  },
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload.data;
      state.usersMeta = payload.meta;

      return state;
    },
    removeUser: (state, { payload }) => {
      state.users = state.users.filter(user => payload !== user.id);

      return state;
    }
  }
});

export default slice.reducer;

export const { setUsers, removeUser } = slice.actions;

export function get(id) {
  return async () => {
    return users.get(id)
      .then((response) => {
        return response.data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
}

export function getAll(params) {
  return async (dispatch) => {
    return users.getAll(params)
      .then((response) => {
        dispatch(setUsers(response));

        return response.data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
}

export function store(user) {
  return async () => {
    return users.store(user)
      .then((response) => {
        return response.data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
}

export function update(user) {
  return async () => {
    return users.update(user)
      .then((response) => {
        return response.data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
}

export function destroy(id) {
  return async (dispatch) => {
    return users.destroy(id)
      .then((response) => {
        dispatch(removeUser(id));

        return response.data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
}
