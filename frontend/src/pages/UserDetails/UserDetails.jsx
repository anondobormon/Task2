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
    <div className="user_details">
      <h2>User Details</h2>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          {user ? (
            <div>
              <p className="name">
                Name: <span> {user.name} </span>{" "}
              </p>
              <p className="email">
                Email: <span> {user.email}</span>{" "}
              </p>
              <p className="id">
                ID: <span> {user._id} </span>{" "}
              </p>
              <p className="role">
                Role: <span>{user.role}</span>{" "}
              </p>
            </div>
          ) : (
            "Not found!"
          )}
        </div>
      )}
    </div>
  );
}
