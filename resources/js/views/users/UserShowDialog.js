import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import { get } from "~/store/reducers/users";

import PropTypes from "prop-types";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";

export default function UserShowDialog({ onClose, selectedUser, open }) {

  const classes = makeStyles((theme) => ({
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      margin: `${theme.spacing(1)}px auto 0`
    },
  }))();

  const dispatch = useDispatch();
  const pageLoading = useSelector(state => state.app.pageLoading);
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    if ( !selectedUser ) {
      return;
    }

    dispatch(get(selectedUser)).then((data) => setUser(data));

  }, [selectedUser]);

  if ( pageLoading || user === null ) {
    return (
      <Dialog onClose={() => onClose()} open={open}>
        <Card>
          <CircularProgress />
        </Card>
      </Dialog>
    );
  }

  return (
    <Dialog onClose={() => onClose()} open={open}>
      <DialogTitle>{`${user.first_name} ${user.last_name}`}</DialogTitle>
      <Card>
        <Avatar className={classes.avatar} variant="square" alt={`${user.first_name} ${user.last_name} avatar`} src={user.avatar} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {user.email}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {user.role.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {user.bio}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  );
}

UserShowDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedUser: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool
  ]).isRequired,
};
