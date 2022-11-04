import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="navbar">
      <div className="content">
        <div className="avatar">
          <img
            src="https://i.ibb.co/BfLNrxt/undraw-profile-pic-ic5t.png"
            alt=""
          />
        </div>
        <div className="role">
          <div className="name">{user && user.name}</div>
          <div className="role">{user && user.role}</div>
        </div>
        {!user && (
          <Link className="button" to="/login">
            Login/Register
          </Link>
        )}
      </div>
    </div>
  );
}
