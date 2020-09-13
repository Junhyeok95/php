import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/User";

const LoginPage = () => {
  const { login } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    console.log("- login onSubmit - \n", email, password);
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
                    />
                    <span className="invalid-feedback" role="alert">
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
                    ></input>
                    <span className="invalid-feedback" role="alert">
                      <strong></strong>
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6 offset-md-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="remember"
                        id="remember"
                      />
                      <label htmlFor="remember" className="form-check-label">
                        Remember Me
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group row mb-0">
                  <div className="col-md-8 offset-md-4">
                    <button type="submit" className="btn btn-primary">
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
