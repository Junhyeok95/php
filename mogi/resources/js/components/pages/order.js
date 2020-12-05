import React, { Fragment, useContext } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { UserContext } from "../../components/contexts/user";
import styled from "styled-components";

import OrderManagement from "./order-management";
import OrderDetail from "./order-detail";
import OrderEdit from "./order-edit";
import NotFoundPage from "../pages/not";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;
const StyledTitle = styled.div`
    font-size: 48px;
    color: blue;
    flex: 1;
`;

const OrderPage = ({ match }) => {
    const { userInfo } = useContext(UserContext);

    const navUl = () => {
        return (
            <Fragment>
                <StyledDiv className="flex-center position-ref full-height">
                    <div className="content">
                        <StyledTitle className="m-b-md text-center">
                            受注管理画面
                        </StyledTitle>
                    </div>
                </StyledDiv>
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
            </Fragment>
        );
    };

    return (
        <div>
            {navUl()}
            <div style={{ minHeight: 500, border: "solid blue 20px" }}>
                <Switch>
                    <Route
                        exact
                        path={match.path}
                        component={OrderManagement}
                    />
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
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </div>
    );
};

export default OrderPage;
