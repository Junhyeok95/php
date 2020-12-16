import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/user";

const LoginPage = () => {
    const { login } = useContext(UserContext);

    const [email, setEmail] = useState("staff@kanda-it-school.com");
    const [password, setPassword] = useState("password");

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    };

    const onChange = e => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        }
        if (name === "password") {
            setPassword(value);
        }
    };

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Login</div>

                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="form-group row">
                                    <label
                                        htmlFor="email"
                                        className="col-md-4 col-form-label text-md-right"
                                    >
                                        E-Mail Address
                                    </label>
                                    <div className="col-md-6">
                                        <input
                                            id="email"
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            required
                                            autoFocus
                                            onChange={onChange}
                                            value={email}
                                        />
                                        <span
                                            className="invalid-feedback"
                                            role="alert"
                                        >
                                            <strong></strong>
                                        </span>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label
                                        htmlFor="password"
                                        className="col-md-4 col-form-label text-md-right"
                                    >
                                        Password
                                    </label>
                                    <div className="col-md-6">
                                        <input
                                            id="password"
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            required
                                            onChange={onChange}
                                            value={password}
                                        ></input>
                                        <span
                                            className="invalid-feedback"
                                            role="alert"
                                        >
                                            <strong></strong>
                                        </span>
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
