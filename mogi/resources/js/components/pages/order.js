import React, { Fragment, useContext } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { UserContext } from "../../components/contexts/user";
import styled from "styled-components";

import OrderManagement from "./order-management";
import NotFoundPage from "../pages/not";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const StyledTitle = styled.div`
    font-size: 48px;
    color: blue;
    flex: 1;
`;

const OrderPage = ({ match }) => {
    return (
        <div>
            <StyledDiv>
                <StyledTitle className="text-center">受注管理画面</StyledTitle>
            </StyledDiv>
            <Switch>
                <Route exact path={match.path} component={OrderManagement} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    );
};

export default OrderPage;
