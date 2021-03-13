import store from "~/store/store";

export const userCan = (permission, user = store.getState().auth.user) => {
  return user.permissions.includes(permission);
};
