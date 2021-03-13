import { createSlice } from "@reduxjs/toolkit";

import NProgress from "nprogress";

const app = createSlice({
  name: "app",
  initialState: {
    pageLoading: false,
    drawerOpen: true,
    drawerWidth: 240
  },
  reducers: {
    setPageLoading: (state, action) => {
      state.pageLoading = action.payload;

      if (action.payload === true) {
        NProgress.start();
      } else {
        NProgress.done();
        NProgress.remove();
      }

      return state;
    },
    openDrawer: (state) => {
      state.drawerOpen = true;
      return state;
    },
    closeDrawer: (state) => {
      state.drawerOpen = false;
      return state;
    }
  }
});

export const { setPageLoading, openDrawer, closeDrawer } = app.actions;

export default app.reducer;
