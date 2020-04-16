import React, { useContext } from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
function Header(props) {
  const { user, isAuthenticated, logout } = useContext(GlobalContext);

  const Logout = () => {
    logout();
  };

  const authenticatedNavBar = () => {
    return (
      <div className="right-header">
        <h3>Welcome {user.username}</h3>
        <button type="button" onClick={Logout}>
          <Link to="/" className="noBtn">
            logout
          </Link>
        </button>
      </div>
    );
  };

  const unauthenticatedNavBar = () => {
    return (
      <div className="right-header">
        <Link to="/login" className="noCss">
          <li>login</li>
        </Link>
        <Link to="/register" className="noCss">
          <li>Register</li>
        </Link>
      </div>
    );
  };

  return (
    <header>
      <h1>
        <HighlightIcon />
        <Link to="/" className="noCss">
          Keeper
        </Link>
      </h1>
      <div>
        <ul>
          {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </ul>
      </div>
    </header>
  );
}

export default Header;
