import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError, getUserDetails } from "../../actions/userAction";

export default function UserDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userDetails);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }

    dispatch(getUserDetails(id));
  }, [id, error, dispatch]);

  return (
    <div>
      <h2>User Details</h2>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          {user ? (
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>ID: {user._id}</p>
              <p>Role: {user.role}</p>
            </div>
          ) : (
            "Not found!"
          )}
        </div>
      )}
    </div>
  );
}
