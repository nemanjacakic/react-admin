import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "~/store/reducers/auth";

import Button from "@material-ui/core/Button";

export default function LogoutButton() {
  const dispatch = useDispatch();

  return (
    <Button size="small" variant="contained" color="secondary" onClick={() => dispatch(logout())}>
      Sign Out
    </Button>
  );
}
