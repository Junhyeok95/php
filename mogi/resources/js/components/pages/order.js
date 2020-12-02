import React, { Fragment, useContext } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { UserContext } from "../../components/contexts/user";

import OrderManagement from "./order-management";
import OrderDetail from "./order-detail";
import OrderEdit from "./order-edit";

const OrderPage = ({ match }) => {
    const { userInfo } = useContext(UserContext);

    const navUl = () => {
        return (
            <ul className="nav-item m-2">
                <li className="nav-item">
                    <Link to="/order">/order</Link>
                </li>
                <li className="nav-item">
                    <Link to="/order/detail">/order/:detail</Link>
                </li>
                <li className="nav-item">
                    <Link to="/order/detail/edit">/order/:detail/edit</Link>
                </li>
            </ul>
        );
    };

    return (
        <div>
            {navUl()}
            <Switch>
                <Route exact path={match.path} component={OrderManagement} />
                <Route
                    exact
                    path={`${match.path}/:detail`}
                    render={props => (
                        <OrderDetail userInfo={userInfo} {...props} />
                    )}
                />
                <Route
                    exact
                    path={`${match.path}/:detail/edit`}
                    render={props => (
                        <OrderEdit userInfo={userInfo} {...props} />
                    )}
                />
            </Switch>
        </div>
    );
};

export default OrderPage;
