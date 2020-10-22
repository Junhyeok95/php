import React, { Fragment, useState, useEffect } from "react";
import { Route, NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { Container, Row, Col, Badge } from "react-bootstrap";
import List from "./List";
import Detail from "./Detail";

const StyledDiv = styled.div`
  padding: 0.5rem;
  margin: 1rem;
  border: 1px black solid;
  font-size: 24px;
  background-color: white;
`;

const TestPage3 = ({ match, location, history }) => {
  const [text, setText] = useState("Test Page3");

  console.log(match.url);

  useEffect(() => {
    console.log("Test Page3");
  }, []);

  const renderItem = () => {
    const [category, setCategory] = useState({
      en: ["all", "one", "two", "three"],
      ko: ["전체보기", "하나", "둘", "셋"],
    });

    let itemArr = [];
    for (let i = 0; i < category.en.length; i++) {
      itemArr.push(
        <Badge key={i} variant="Light">
          <NavLink
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
            to={`${match.url}/${category.en[i]}`}
          >
            {category.ko[i]}
          </NavLink>
        </Badge>
      );
    }
    return itemArr;
  };

  return (
    <Fragment>
      <div>
        <StyledDiv>{text}</StyledDiv>
        <StyledDiv>
          <div>{renderItem()}</div>
          <br />
          <Route path={`${match.url}/:detail`} component={Detail} exact />
          <Route path={`${match.url}`} component={List} exact />
          <br />
        </StyledDiv>
        <Container>
          <Row>
            <Col>
              <pre style={{ fontSize: 10 }}>
                <h1>match</h1>
                {JSON.stringify(match, null, 4)}
              </pre>
            </Col>
            <Col>
              <pre style={{ fontSize: 10 }}>
                <h1>location</h1>
                {JSON.stringify(location, null, 4)}
              </pre>
            </Col>
            <Col>
              <pre style={{ fontSize: 10 }}>
                <h1>history</h1>
                {JSON.stringify(history, null, 4)}
              </pre>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default TestPage3;
