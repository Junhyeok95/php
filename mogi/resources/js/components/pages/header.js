import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../contexts/user";
import styled from "styled-components";

const Header = () => {
    const { userInfo, logout } = useContext(UserContext);

    const activeStyle = {
        // background: "black",
        // color: "white",
        fontWeight: "900"
    };

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div className="container">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link
                                className="nav-link font-weight-bold"
                                to="/product"
                                style={{ color: "#000000", fontSize: 16 }}
                            >
                                神田ユニフォーム店
                            </Link>
                        </li>
                    </ul>
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

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mr-auto">
                            {userInfo && (
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/order"
                                        style={{ fontSize: 16 }}
                                        activeStyle={activeStyle}
                                    >
                                        受注管理画面
                                    </NavLink>
                                </li>
                            )}
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            {userInfo ? (
                                <li className="nav-item">
                                    <a
                                        style={{ cursor: "pointer" }}
                                        className="dropdown-item"
                                        onClick={e => {
                                            e.preventDefault();
                                            logout();
                                        }}
                                    >
                                        Logout
                                    </a>
                                </li>
                            ) : (
                                <React.Fragment>
                                    <li className="nav-item">
                                        <Link
                                            className="dropdown-item"
                                            to="/login"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="dropdown-item"
                                            to="/register"
                                        >
                                            Register
                                        </Link>
                                    </li>
                                </React.Fragment>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
