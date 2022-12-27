import './Navbar.css'
import { Link } from "react-router-dom";

const Navbar = () => {
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
        <Link className="account-item" to="/login">Login</Link>
        <Link className="account-item" to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Navbar;
