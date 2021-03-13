import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";

import Header from "~/views/Header";
import Sidebar from "~/views/Sidebar";
import Main from "~/views/Main";
import Footer from "~/views/Footer";

import Dashboard from "~/views/Dashboard";
import UsersList from "~/views/users/UsersList";
import UsersCreate from "~/views/users/UsersCreate";
import UsersEdit from "~/views/users/UsersEdit";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  }
}));

export default function Admin() {
  const classes = useStyles();
  const match = useRouteMatch();
  const loggedIn = useSelector(state => state.auth.loggedIn);

  if ( !loggedIn ) {
    return (
      <Redirect to="/admin/login" />
    );
  }

  return (
    <div className={classes.root}>
      <Header />
      <Sidebar />
      <Main>
        <Switch>
          <Route path={`${match.path}/dashboard`}>
            <Dashboard />
          </Route>
          <Route path={`${match.path}/users/create`}>
            <UsersCreate />
          </Route>
          <Route path={`${match.path}/users/:id/edit`}>
            <UsersEdit />
          </Route>
          <Route path={`${match.path}/users`}>
            <UsersList />
          </Route>
          <Route path="/">
            <Redirect to={`${match.path}/dashboard`} />
          </Route>
        </Switch>
      </Main>
      <Footer />
    </div>
  );
}
