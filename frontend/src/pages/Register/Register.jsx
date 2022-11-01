import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../actions/userAction";
import "./Register.scss";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [error, isAuthenticated, navigate]);

  const handleDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, name, password } = user;

    email && name && password && dispatch(register(user));
  };
  return (
    <div className="register">
      <form action="">
        <h2>Register here!</h2>

        <input
          onChange={handleDataChange}
          type="text"
          placeholder="Enter your name"
          name="name"
        />
        <input
          onChange={handleDataChange}
          type="email"
          name="email"
          placeholder="Enter your email"
          id=""
        />
        <input
          onChange={handleDataChange}
          type="password"
          name="password"
          placeholder="Enter your password"
          id=""
        />

        <p>
          You don't have account! <Link to="/login">Login here</Link>
        </p>

        {error && <p className="error">{error}</p>}
        {isAuthenticated && <p className="success">Login Successfully</p>}

        <input
          onClick={handleSubmit}
          type="submit"
          value={` ${loading ? "Loading..." : "Login"}`}
        />
      </form>
    </div>
  );
}
