import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { UserContext } from "../../components/contexts/user";
import styled from "styled-components";

import ProductHome from "./product-home";
import ProductBuy from "./product-buy";
import NotFoundPage from "../pages/not";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const StyledTitle = styled.div`
    flex: 1;
    font-size: 48px;
    color: green;
`;

const ProductPage = ({ match }) => {
    const { userInfo } = useContext(UserContext);

    return (
        <div>
            <StyledDiv>
                <StyledTitle className="text-center">
                    神田ユニフォーム店
                </StyledTitle>
            </StyledDiv>
            <Switch>
                <Route exact path={match.path} component={ProductHome} />
                <Route
                    exact
                    path={`${match.path}/create`}
                    render={props => (
                        <ProductBuy userInfo={userInfo} {...props} />
                    )}
                />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    );
};

export default ProductPage;
