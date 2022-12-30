import './Navbar.css'
import { Link } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {

  const {user} = useAuthContext();
  const {logout} = useLogout();

  const handleClick = () => {
    logout();
  }

  return (
    <div className="navbar">
      <Link to="/" className="title">
        <img className="logo" src={process.env.PUBLIC_URL + "/logo.png"} alt="" />
        <span className="title-name">Lol Tools</span>
      </Link>
      <div className="panel">
        <Link className="panel-item" to="/">Home</Link>
        <Link className="panel-item" to="/options">Options</Link>
        <Link className="panel-item" to="/about">About</Link>
      </div>
      <div className="account">
        {user && (
          <div>
            <span className="account-username">Welcome, {user.username}</span>
            <button className="account-item log-out" onClick={handleClick}>Logout</button>
          </div>
        )}
        {!user && (
          <div>
            <Link className="account-item" to="/login">Login</Link>
            <Link className="account-item" to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
