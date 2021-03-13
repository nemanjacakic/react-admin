import React from "react";
import clsx from "clsx";
import { userCan } from "~/helpers/auth";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer } from "~/store/reducers/app";

import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import Divider from "@material-ui/core/Divider";


export default function Sidebar() {
  const dispatch = useDispatch();
  const drawerWidth = useSelector(state => state.app.drawerWidth);
  const drawerOpen = useSelector(state => state.app.drawerOpen);
  const user = useSelector(state => state.auth.user);

  const classes = makeStyles((theme) => ({
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    drawerPaper: {
      position: "relative",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }
  }))();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
      }}
      open={drawerOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={() => dispatch(closeDrawer())}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Admin logo" src="/images/AdminLogo.png" />
          </ListItemAvatar>
          <ListItemText primary="Admin" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem component={NavLink} to={`/admin/users/${user.id}/edit`} activeClassName="Mui-selected" button>
          <ListItemAvatar>
            <Avatar alt="Logged in user avatar" src={user.avatar} />
          </ListItemAvatar>
          <ListItemText primary={`${user.first_name} ${user.last_name}`} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem component={NavLink} exact to="/admin/dashboard" activeClassName="Mui-selected" button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {userCan("view users") && <ListItem component={NavLink} exact to="/admin/users" activeClassName="Mui-selected" button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>}
      </List>
    </Drawer>
  );
}
