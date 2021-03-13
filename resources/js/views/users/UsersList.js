import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import queryString from "query-string";
import alertify from "alertifyjs";

import { userCan } from "~/helpers/auth";
import { setPageLoading } from "~/store/reducers/app";
import { getAll, destroy } from "~/store/reducers/users";

import useUsersGrid from "~/hooks/useUsersGrid";
import UserShowDialog from "~/views/users/UserShowDialog";

import DataTable from "react-data-table-component";
import { NavLink, Redirect } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export default function UsersList() {
  const dispatch = useDispatch();
  const pageLoading = useSelector(state => state.app.pageLoading);
  const users = useSelector(state => state.users.users);
  const usersMeta = useSelector(state => state.users.usersMeta);
  const authUser = useSelector(state => state.auth.user);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);
  const { gridFilters, handlePerRowsChange, handlePageChange, handleSortChange } = useUsersGrid();

  const deleteUser = (id) => {
    alertify.confirm(
      "Are you sure ?",
      "This will delete selected user",
      () => {
        dispatch(setPageLoading(true));
        dispatch(destroy(id))
          .then(() => {
            alertify.success("User deleted");
            dispatch(getAll(queryString.parse(location.search))).then(() => dispatch(setPageLoading(false)));
          })
          .catch(() => dispatch(setPageLoading(false)));
      }, () => {}
    );
  };

  const columns = [
    { name: "ID", selector: "id", sortable: true, width: "70px" },
    {
      name: "Avatar",
      selector: "avatar",
      cell: row => <img width="50px" alt={`${row.first_name} ${row.last_name} avatar`} src={row.avatar} />,
      width: "100px"
    },
    { name: "First Name", selector: "first_name", sortable: true, width: "200px" },
    { name: "Last Name", selector: "last_name", sortable: true, width: "200px" },
    { name: "Role", selector: "role.name", width: "100px" },
    { name: "Email", selector: "email", sortable: true },
    { name: "Actions", selector: "actions", cell: row => {
      return (
        <div>
          <IconButton onClick={ () => {
            setSelectedUser(row.id);
            setDialogOpen(true);
          }}>
            <VisibilityIcon />
          </IconButton>
          {(userCan("edit users") || row.id === authUser.id) && <IconButton component={NavLink} to={`/admin/users/${row.id}/edit`}>
            <EditIcon />
          </IconButton>}
          {userCan("delete users") && <IconButton onClick={() => deleteUser(row.id)}>
            <DeleteIcon />
          </IconButton>}
        </div>
      );
    },
    width: "200px"
    },
  ];

  if ( !userCan("view users") ) {
    return (
      <Redirect to="/admin/dashboard" />
    );
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <DataTable
          title="Users"
          subHeader={true}
          subHeaderComponent={userCan("create users") && <Button component={NavLink} to='/admin/users/create' variant="contained" color="primary">New User</Button>}
          columns={columns}
          data={users}
          progressPending={pageLoading}
          pagination
          paginationServer
          paginationDefaultPage={gridFilters.page}
          paginationPerPage={gridFilters.itemsPerPage}
          paginationRowsPerPageOptions={[5, 10, 15]}
          paginationComponentOptions={{selectAllRowsItem: true}}
          paginationTotalRows={usersMeta.total}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          defaultSortField={gridFilters.sortBy}
          defaultSortAsc={gridFilters.sortAsc}
          sortServer
          onSort={handleSortChange}
          theme="solarized"
          key={gridFilters.sortAsc}
        />
        <UserShowDialog selectedUser={selectedUser} open={dialogOpen} onClose={() => setDialogOpen(false)} />
      </Grid>
    </Grid>
  );
}

