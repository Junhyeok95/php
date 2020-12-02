import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/user";

const Header = () => {
    const { userInfo, logout } = useContext(UserContext);

    const onClick = e => {
        e.preventDefault();
        logout();
    };

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        ユニフォーム受注管理システム
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

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    神田ユニフォーム店
                                </Link>
                            </li>
                            {userInfo && (
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/"
                                        onClick={() => {
                                            console.log("push");
                                        }}
                                    >
                                        受注管理画面
                                    </Link>
                                </li>
                            )}
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            {userInfo ? (
                                <li className="nav-item">
                                    <a
                                        style={{ cursor: "pointer" }}
                                        className="dropdown-item"
                                        onClick={onClick}
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
                                    {/*<li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to="/register"
                                        >
                                            Register
                                        </Link>
                                    </li>*/}
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
