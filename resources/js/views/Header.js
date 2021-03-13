import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "~/store/reducers/app";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import LogoutButton from "~/components/LogoutButton";

export default function Header() {
  const dispatch = useDispatch();
  const drawerWidth = useSelector(state => state.app.drawerWidth);
  const drawerOpen = useSelector(state => state.app.drawerOpen);
  const user = useSelector(state => state.auth.user);
  const [userMenuAnchor, setuserMenuAnchor] = useState(null);

  const userMenuOpen = Boolean(userMenuAnchor);

  const classes = makeStyles((theme) => ({
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
      justifyContent: "flex-end"
    },
    toolbarShift: {
      justifyContent: "space-between"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
    userMenuImage: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      margin: `${theme.spacing(1)}px auto 0`
    },
    UserMenuAction: {
      justifyContent: "center"
    }
  }))();


  return (
    <AppBar position="absolute" className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}>
      <Toolbar className={clsx(classes.toolbar, !drawerOpen && classes.toolbarShift)}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(openDrawer())}
          className={clsx(classes.menuButton, drawerOpen && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="Logged in user avatar" src={user.avatar} />
            </ListItemAvatar>
            <ListItemText primary={`${user.first_name} ${user.last_name}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" color="inherit" onClick={(e) => setuserMenuAnchor(e.currentTarget)}>
                <MoreVertIcon/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Popover
          open={userMenuOpen}
          anchorEl={userMenuAnchor}
          onClose={() => setuserMenuAnchor(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Card>
            <Avatar variant="square" className={classes.userMenuImage} alt="Logged in user avatar" src={user.avatar} />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                {`${user.first_name} ${user.last_name}`}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {user.email}
              </Typography>
            </CardContent>
            <CardActions className={classes.UserMenuAction}>
              <Button component={NavLink} to={`/admin/users/${user.id}/edit`}  size="small" variant="contained">
                Profile
              </Button>
              <LogoutButton/>
            </CardActions>
          </Card>
        </Popover>
      </Toolbar>
    </AppBar>
  );
}
