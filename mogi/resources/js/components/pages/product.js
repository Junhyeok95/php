import React, { Fragment, useContext } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { UserContext } from "../../components/contexts/user";
import styled from "styled-components";

import ProductHome from "./product-home";
import ProductDetail from "./product-detail";
import NotFoundPage from "../pages/not";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;
const StyledTitle = styled.div`
    font-size: 48px;
    color: green;
    flex: 1;
`;

const ProductPage = ({ match }) => {
    const { userInfo } = useContext(UserContext);

    const navUl = () => {
        return (
            <Fragment>
                <StyledDiv className="flex-center position-ref full-height">
                    <div className="content">
                        <StyledTitle className="m-b-md text-center">
                            神田ユニフォーム店
                        </StyledTitle>
                    </div>
                </StyledDiv>
                <ul className="nav-item m-2">
                    <li className="nav-item">
                        <Link to="/product">/product</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/product/detail">/product/:detail</Link>
                    </li>
                </ul>
            </Fragment>
        );
    };

    return (
        <div>
            {navUl()}
            <div style={{ minHeight: 500, border: "solid green 20px" }}>
                <Switch>
                    <Route exact path={match.path} component={ProductHome} />
                    <Route
                        exact
                        path={`${match.path}/:detail`}
                        render={props => (
                            <ProductDetail userInfo={userInfo} {...props} />
                        )}
                    />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </div>
    );
};

export default ProductPage;
