require("./bootstrap");

// React + Laravel
// app.js = index.js + Root.js + App.js

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import { UserContextProvider } from "./contexts/User";

import Header from "./layouts/Header";
import Body from "./layouts/Body";
import Footer from "./layouts/Footer";

import TestPage from "./pages/TestPage";
import TestPage2 from "./pages/TestPage2";
import TestPage3 from "./pages/TestPage3";

import HomePage from "./pages/HomePage";
import BoardPage from "./pages/BoardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Body>
        <Route path="/test" component={TestPage} exact />
        <Route path="/test2" component={TestPage2} exact />
        <Route path="/test3" component={TestPage3} exact />
        <Route path="/" component={HomePage} exact />
        <Route path="/boards" component={BoardPage} exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/register" component={RegisterPage} exact />
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
