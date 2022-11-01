import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";
import "./Sidebar.scss";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout());

    navigate("/login");
  };

  const activeStyle = {
    color: "purple",
    background: "rgb(63, 63, 140, 0.2)",
  };
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>
          <Link to="/">Dashboard</Link>
        </h2>
      </div>

      <div className="side_menu">
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => isActive && "activeLink"}
              to="/users"
            >
              Users
            </NavLink>{" "}
          </li>
          <li>
            <NavLink
              className={({ isActive }) => isActive && "activeLink"}
              to="/product-list"
            >
              Products
            </NavLink>{" "}
          </li>
          <li>
            <NavLink
              className={({ isActive }) => isActive && "activeLink"}
              to="/create-product"
            >
              Create Product
            </NavLink>{" "}
          </li>
          <li>
            <NavLink
              className={({ isActive }) => isActive && "activeLink"}
              to="/create-user"
            >
              Create User
            </NavLink>{" "}
          </li>
        </ul>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
