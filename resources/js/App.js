import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { setUser } from "~/store/reducers/auth";

import Loader from "~/components/Loader";
import Admin from "~/views/Admin";
import Login from "~/views/auth/Login";

export default function App() {
  const dispatch = useDispatch();
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    dispatch(setUser()).finally(() => setLoading(false));
  }, []);

  if ( loading ) {
    return (
      <Loader />
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/admin/login">
          <Login />
        </Route>
        <Route path="/admin">
          <Admin/>
        </Route>
      </Switch>
    </Router>
  );
}
