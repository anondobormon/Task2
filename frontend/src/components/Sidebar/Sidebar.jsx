import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>LOGO</h2>
      </div>

      <div className="side_menu">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>{" "}
          </li>
          <li>
            <Link to="/users">Users</Link>{" "}
          </li>
          <li>
            <Link to="/product-list">Products</Link>{" "}
          </li>
          <li>
            <Link to="/create-product">Create Product</Link>{" "}
          </li>
          <li>
            <Link to="/create-user">Create User</Link>{" "}
          </li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    </div>
  );
}
