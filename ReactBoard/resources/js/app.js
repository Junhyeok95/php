require("./bootstrap");

// React + Laravel
// app.js = index.js + Root.js + App.js

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { UserContextProvider } from "./contexts/User";

import Header from "./layouts/Header";
import Body from "./layouts/Body";
import Footer from "./layouts/Footer";

import TestPage3 from "./pages/TestPage3";

import HomePage from "./pages/HomePage";
import BoardPage from "./pages/BoardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Body>
        <Switch>
          <Route path="/test3" component={TestPage3} />
          <Route path="/" component={HomePage} exact />
          <Route path="/boards" component={BoardPage} />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/register" component={RegisterPage} exact />
          <Route component={NotFoundPage} />
        </Switch>
      </Body>
      <Footer />
    </React.Fragment>
  );
};

if (document.getElementById("root")) {
  ReactDOM.render(
    <BrowserRouter>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>,
    document.getElementById("root")
  );
}
