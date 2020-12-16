import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserContextProvider } from "./contexts/user";

import Header from "./pages/header";
import MainPage from "./pages/main";
import OrderPage from "./pages/order";
import ProductPage from "./pages/product";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import NotFoundPage from "./pages/not";

const App = () => {
    return (
        <React.Fragment>
            <Header />
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/product" component={ProductPage} />
                <Route path="/order" component={OrderPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route component={NotFoundPage} />
            </Switch>
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
