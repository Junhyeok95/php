import React, { Fragment, useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { Container, Row, Col, Badge } from "react-bootstrap";

import Boards from "./Boards";
import Detail from "./Detail";
import Write from "./Write";

const BoardPage = ({ match }) => {
  const [test, setTest] = useState(null);

  useEffect(() => {}, []);

  const renderNavLink = () => {
    const boardNav = {
      en: ["", "/write"],
      ko: ["기본", "글쓰기"],
    };

    let itemArr = [];
    for (let i = 0; i < boardNav.en.length; i++) {
      itemArr.push(
        <Col
          key={i}
          sm={{ span: 2 }}
          className="justify-content-center text-center"
        >
          <Badge variant="Light">
            <Link to={`${match.url}${boardNav.en[i]}`}>{boardNav.ko[i]}</Link>
          </Badge>
        </Col>
      );
    }
    return <Row>{itemArr}</Row>;
  };

  return (
    <Fragment>
      <Container>
        {renderNavLink()}
        <Route path={`${match.url}`} component={Boards} exact />
        <Route path={`${match.url}/write`} component={Write} exact />
        <Route path={`${match.url}/detail/:detail`} component={Detail} exact />
      </Container>
    </Fragment>
  );
};

export default BoardPage;
