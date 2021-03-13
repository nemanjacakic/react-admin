import React, { useState, useEffect } from "react";

import alertify from "alertifyjs";
import { userCan } from "~/helpers/auth";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

import { store } from "~/store/reducers/users";
import { getAll as getRoles } from "~/store/reducers/roles";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

export default function UsersCreate() {
  const dispatch = useDispatch();
  const roles = useSelector(state => state.roles.roles);
  const history = useHistory();

  const [ user, setUser ] = useState({
    id: "",
    first_name: "",
    last_name: "",
    role: "",
    email: "",
    password: "",
    bio: "",
  });

  const [ errors, setErrors ] = useState({});

  const createUser = (e) => {
    e.preventDefault();

    dispatch(store(user)).then(() => {
      setErrors({});

      alertify.success("User created");

      history.push("/admin/users");
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

    dispatch(getRoles());

  }, []);

  if ( !userCan("create users") ) {
    return (
      <Redirect to="/admin/dashboard" />
    );
  }

  return (
    <Container maxWidth="md">
      <Typography component="h1" variant="h5">
          Create User
      </Typography>
      <form noValidate onSubmit={createUser}>
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
          fullWidth
          required
          id="last_name"
          name="last_name"
          label="Last name"
          error={!!errors.last_name}
          helperText={errors.last_name ? errors.last_name[0] : ""}
          value={user.last_name}
          onChange={(e) => handleInputChange(e)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          error={!!errors.email}
          helperText={errors.email ? errors.email[0] : ""}
          value={user.email}
          onChange={(e) => handleInputChange(e)}
        />
        <FormControl variant="outlined" margin="normal" fullWidth error={!!errors.role}>
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
          {errors.role && <FormHelperText>{errors.role[0]}</FormHelperText>}
        </FormControl>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          error={!!errors.password}
          helperText={errors.password ? errors.password[0] : ""}
          value={user.password}
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
          value={user.bio}
          onChange={(e) => handleInputChange(e)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
            Create
        </Button>
      </form>
    </Container>
  );
}
