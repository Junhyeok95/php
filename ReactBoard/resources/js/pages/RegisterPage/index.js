import React from "react";

const RegisterPage = () => {
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Register</div>

            <div className="card-body">
              <form method="POST" action="{{ route('register">
                <div className="form-group row">
                  <label
                    // for="name"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    Name
                  </label>

                  <div className="col-md-6">
                    <input
                      id="name"
                      type="text"
                      className="form-control"
                      name="name"
                      // value=""
                      required
                      // autocomplete="name"
                      // autofocus
                    />

                    <span className="invalid-feedback" role="alert">
                      <strong></strong>
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    // for="email"
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
                      // value=""
                      required
                      // autocomplete="email"
                    />

                    <span className="invalid-feedback" role="alert">
                      <strong></strong>
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    // for="password"
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
                      // autocomplete="new-password"
                    />

                    <span className="invalid-feedback" role="alert">
                      <strong></strong>
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    // for="password-confirm"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    Confirm Password
                  </label>

                  <div className="col-md-6">
                    <input
                      id="password-confirm"
                      type="password"
                      className="form-control"
                      name="password_confirmation"
                      required
                      // autocomplete="new-password"
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
