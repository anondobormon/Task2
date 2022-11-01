import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../actions/userAction";

export default function CreateUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { loading, success, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, name, password } = user;

    email && name && password && dispatch(createUser(user));
  };
  return (
    <div className="register">
      <form action="">
        <h2></h2>
        <fieldset>
          <legend>Create User here!</legend>
          <input
            onChange={handleDataChange}
            type="text"
            placeholder="Enter user name"
            name="name"
          />
          <input
            onChange={handleDataChange}
            type="email"
            name="email"
            placeholder="Enter user email"
            id=""
          />
          <input
            onChange={handleDataChange}
            type="password"
            name="password"
            placeholder="Enter user password"
            id=""
          />

          {error && <p className="error">{error}</p>}
          {success && <p className="success">Create User Successfully</p>}

          <input
            onClick={handleSubmit}
            type="submit"
            className="button"
            value={` ${loading ? "Loading..." : "Create User"}`}
          />
        </fieldset>
      </form>
    </div>
  );
}
