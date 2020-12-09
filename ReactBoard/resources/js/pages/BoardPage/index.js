import React, { Fragment, useEffect, useContext } from "react";
import { Route, Link } from "react-router-dom";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { UserContext } from "../../contexts/User";

import Boards from "./Boards";
import Detail from "./Detail";
import Write from "./Write";

const BoardPage = ({ match }) => {
  const { userInfo } = useContext(UserContext);

  return (
    <Fragment>
      <Container className="pt-4">
        <Route // write create
          path={`${match.url}`}
          render={(props) => <Boards userInfo={userInfo} {...props} />}
          exact
        />
        <Route // write create
          path={`${match.url}/write`}
          render={(props) => (
            <Write action={"create"} userInfo={userInfo} {...props} />
          )}
          exact
        />
        <Route // write update
          path={`${match.url}/:detail/write`}
          render={(props) => (
            <Write action={"update"} userInfo={userInfo} {...props} />
          )}
          exact
        />
        <Route
          path={`${match.url}/detail/:detail`}
          render={(props) => <Detail userInfo={userInfo} {...props} />}
          exact
        />
      </Container>
    </Fragment>
  );
};

export default BoardPage;
