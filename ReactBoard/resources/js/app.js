require("./bootstrap");

// React + Laravel
// app.js = index.js + Root.js + App.js

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

import HomePage from "./pages/HomePage";
import BoardPage from "./pages/BoardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Route path="/" component={HomePage} exact />
      <Route path="/board" component={BoardPage} exact />
      <Route path="/login" component={LoginPage} exact />
      <Route path="/register" component={RegisterPage} exact />
      <Footer />
    </React.Fragment>
  );
};

if (document.getElementById("root")) {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
}
