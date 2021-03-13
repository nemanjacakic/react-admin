import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import alertify from "alertifyjs";

import { userCan } from "~/helpers/auth";

import { get, update } from "~/store/reducers/users";
import { getAll as getRoles } from "~/store/reducers/roles";
import { updateAuthUser } from "~/store/reducers/auth";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function UsersEdit() {
  const dispatch = useDispatch();
  const authUser = useSelector(state => state.auth.user);
  const roles = useSelector(state => state.roles.roles);

  const [ user, setUser ] = useState({
    id: "",
    first_name: "",
    last_name: "",
    role: "",
    email: "",
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
    bio: "",
  });

  const [ errors, setErrors ] = useState({});

  const { id } = useParams();

  const updateUser = (e) => {
    e.preventDefault();

    dispatch(update(user)).then((data) => {
      setErrors({});

      if ( data.id === authUser.id ) {
        dispatch(updateAuthUser(data));
      }

      alertify.success("User updated");

    }).catch((data) => {
      setErrors(data.errors);
    });
  };

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setUser({
      ...user,
      [name]: value
    });
  };

  useEffect(() => {
    Promise.all([
      dispatch(get(id)),
      dispatch(getRoles())
    ]).then(([ userData ]) => {
      userData.role = userData.role.id;
      setUser({...user, ...userData});
    });

  }, [id]);

  if ( user.id === "" ) {
    return (
      <Container>
        <Grid
          container
          direction="row"
          justify="center"
        >
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if ( !userCan("edit users") && user.id !== authUser.id ) {
    return (
      <Redirect to="/admin/dashboard" />
    );
  }

  return (
    <Container maxWidth="md">
      <Typography component="h1" variant="h5">
          Edit { user.id === authUser.id ? "Profile" : "User" }
      </Typography>
      <form noValidate onSubmit={updateUser}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          id="first_name"
          name="first_name"
          label="First name"
          error={!!errors.first_name}
          helperText={errors.first_name ? errors.first_name[0] : ""}
          value={user.first_name}
          onChange={(e) => handleInputChange(e)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="last_name"
          name="last_name"
          label="Last name"
          error={!!errors.last_name}
          helperText={errors.last_name ? errors.last_name[0] : ""}
          fullWidth
          value={user.last_name}
          onChange={(e) => handleInputChange(e)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          id="email"
          label="Email Address"
          name="email"
          error={!!errors.email}
          helperText={errors.email ? errors.email[0] : ""}
          value={user.email}
          onChange={(e) => handleInputChange(e)}
        />
        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
            value={user.role}
            onChange={(e) => handleInputChange(e)}
            id="role"
            label="Role"
            name="role"
          >
            {roles.map((role) => {
              return <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="old_password"
          label="Old password"
          type="old_password"
          id="old_password"
          error={!!errors.old_password}
          helperText={errors.old_password ? errors.old_password[0] : ""}
          value={user.old_password}
          onChange={(e) => handleInputChange(e)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="new_password"
          label="New password"
          type="new_password"
          id="new_password"
          error={!!errors.new_password}
          helperText={errors.new_password ? errors.new_password[0] : ""}
          value={user.new_password}
          onChange={(e) => handleInputChange(e)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="new_password_confirmation"
          label="New password confirmation"
          type="new_password_confirmation"
          id="new_password_confirmation"
          error={!!errors.new_password_confirmation}
          helperText={errors.new_password_confirmation ? errors.new_password_confirmation[0] : ""}
          value={user.new_password_confirmation}
          onChange={(e) => handleInputChange(e)}
        />
        <TextField
          multiline
          variant="outlined"
          margin="normal"
          fullWidth
          rows={4}
          name="bio"
          label="Bio"
          type="bio"
          id="bio"
          error={!!errors.bio}
          helperText={errors.bio ? errors.bio[0] : ""}
          value={user.bio === null ? "" : user.bio}
          onChange={(e) => handleInputChange(e)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
            Update
        </Button>
      </form>
    </Container>
  );
}
