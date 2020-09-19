import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/User";

const Header = () => {
  const { userInfo, logout } = useContext(UserContext);

  const onClick = e => {
    e.preventDefault();
    logout();
  };

  const onSubmit = e => {
    e.preventDefault();
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
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={() => {}}>
                  /
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/boards" onClick={() => {}}>
                  Board
                </Link>
              </li>
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
              <li className="nav-item dropdown">
                <a
                  id="navbarDropdown"
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {userInfo ? userInfo + " 님" : "미 로그인"}
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

                  <form id="logout-form" className="d-none" onSubmit={onSubmit}>
                    @csrf
                  </form>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
