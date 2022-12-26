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
        {/* <Link to="/">Home</Link>
        <Link to="/options">Options</Link>
        <Link to="/about">About</Link> */}
        <a href="">asdasd</a>
        <a href="">asdsad</a>
      </div>
      <div>
        <div className="account">

        </div>
      </div>
    </div>
  );
}

export default Navbar;
