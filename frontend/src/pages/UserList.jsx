import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearError, deleteUser, getAllUsers } from "../actions/userAction";
import {
  DELETE_USER_RESET,
  UPDATE_USER_RESET,
} from "../constants/userConstants";
import ToolTip from "./ToolTip";
import "./UserList.scss";

export default function UserList() {
  const dispatch = useDispatch();

  const { users, error } = useSelector((state) => state.users);
  const { success: updateUserSuccess, error: updateUserError } = useSelector(
    (state) => state.updateUser
  );
  const {
    loading,
    success,
    message,
    error: deleteError,
  } = useSelector((state) => state.deleteUser);

  useEffect(() => {
    if (success) {
      alert(message);
      dispatch({ type: DELETE_USER_RESET });
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearError());
    }

    if (updateUserSuccess) {
      alert("Role changed successfully");
      dispatch({ type: UPDATE_USER_RESET });
    }

    if (updateUserError) {
      alert(updateUserError);
      dispatch(clearError());
    }

    dispatch(getAllUsers());
  }, [
    error,
    success,
    deleteError,
    dispatch,
    updateUserSuccess,
    updateUserError,
  ]);
  const columns = [
    { field: "id", headerName: "User Id", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.6,

      renderCell: (params) => {
        return (
          <div className="cellWrapper">
            <div className="name">{params.getValue(params.id, "name")}</div>
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 50,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <div className="actions">
            <ToolTip params={params} />
          </div>
        );
      },
    },
    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      type: "number",
      minWidth: 120,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="actions">
            <Link
              className="view"
              to={`/user/${params.getValue(params.id, "id")}`}
            >
              View
            </Link>

            <button
              className="deletebtn"
              disabled={loading ? true : false}
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  const deleteUserHandler = (id) => {
    id && dispatch(deleteUser(id));
  };

  return (
    <div className="userlist">
      <h2>All Users</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        className="productListTable"
        autoHeight
      />
    </div>
  );
}
