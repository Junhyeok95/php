import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/User";

const RegisterPage = () => {
  const { register } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    console.log(
      "- register onSubmit - \n",
      name,
      email,
      password,
      passwordConfirm
    );
    register(name, email, password, passwordConfirm);
  };

  const onChange = e => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    }
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "passwordConfirm") {
      setPasswordConfirm(value);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Register</div>

            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="form-group row">
                  <label className="col-md-4 col-form-label text-md-right">
                    Name
                  </label>
                  <div className="col-md-6">
                    <input
                      id="name"
                      type="text"
                      className="form-control"
                      name="name"
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
                    />
                    <span className="invalid-feedback" role="alert">
                      <strong></strong>
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="passwordConfirm"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    Confirm Password
                  </label>
                  <div className="col-md-6">
                    <input
                      id="passwordConfirm"
                      type="password"
                      className="form-control"
                      name="passwordConfirm"
                      required
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="form-group row mb-0">
                  <div className="col-md-6 offset-md-4">
                    <button type="submit" className="btn btn-primary">
                      Register
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

export default RegisterPage;
