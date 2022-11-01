import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../actions/userAction";
import "./Login.scss";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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

    const { email, password } = user;

    email && password && dispatch(login(email, password));
  };
  return (
    <div className="login">
      <form encType="multipart/form-data" action="">
        <h2>Login here!</h2>

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
          You don't have account! <Link to="/register">Register here</Link>
        </p>

        {error && <p className="error">{error}</p>}
        {isAuthenticated && <p className="success">Register Successfully</p>}
        <input
          onClick={handleSubmit}
          type="submit"
          value={` ${loading ? "Loading..." : "Login"}`}
        />
      </form>
    </div>
  );
}
