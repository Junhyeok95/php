import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/User";
import { useHistory } from "react-router-dom";

const Header = () => {
  const { userInfo, logout } = useContext(UserContext);

  const onClick = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="/">
            LRB
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/boards" onClick={() => {}}>
                  Board
                </Link>
              </li>
            </ul>

            {userInfo ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                  <a
                    id="navbarDropdown"
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <strong style={{ color: "#0000ff" }}>
                      {userInfo.name}
                    </strong>{" "}
                    님
                  </a>

                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdown"
                  >
                    <a
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                      onClick={onClick}
                    >
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
