import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

const StyledDiv = styled.div`
  padding: 0.5rem;
  margin: 1rem;
  border: 1px black solid;
  font-size: 24px;
  background-color: white;
`;

const Style = {
  backgroundColor: "#6afdff",
  border: "1px solid black",
  height: "180px",
  fontSize: "16px"
};

const Style2 = {
  backgroundColor: "#46ff69",
  border: "1px solid black",
  height: "20px",
  fontSize: "12px"
};

const Style3 = {
  backgroundColor: "#1179ff",
  border: "1px solid black",
  height: "30px"
};

const Style4 = {
  backgroundColor: "#eca5ff",
  border: "1px solid black",
  height: "40px"
};

const TestPage = () => {
  const [text, setText] = useState("Test Page");

  useEffect(() => {
    console.log("Test Page");
  }, []);

  const renderItem = () => {
    let nameArr = [1, 2, "xl", 4, "lg", 6, "md", 8, "sm", 10, "xs", 12];
    let itemArr = [];
    for (let i = 0; i < 12; i++) {
      itemArr.push(<Col style={Style2}>{nameArr[i]}</Col>);
    }
    return itemArr;
  };

  return (
    <div>
      <StyledDiv>{text}</StyledDiv>
      <Container fluid>
        <Row>
          <Col style={Style} xs={10} sm={8} md={6} lg={4} xl={2}>
            xs={10}
            <br />
            sm={8}
            <br />
            md={6}
            <br />
            lg={4}
            <br />
            xl={2}
          </Col>
          <Col style={Style} xs={2} sm={4} md={6} lg={8} xl={10}>
            xs={2}
            <br />
            sm={4}
            <br />
            md={6}
            <br />
            lg={8}
            <br />
            xl={10}
          </Col>
        </Row>
        <div>
          <Row>{renderItem()}</Row>
        </div>
        <Row>
          <Col style={Style3}>1 of 3</Col>
          <Col style={Style3} sm={6}>
            2 of 3 (wider)
          </Col>
          <Col style={Style3}>3 of 3</Col>
        </Row>
        <Row>
          <Col style={Style3}>1 of 3</Col>
          <Col style={Style3} sm={5}>
            2 of 3 (wider)
          </Col>
          <Col style={Style3}>3 of 3</Col>
        </Row>
        <Row>
          <Col style={Style3}>1 of 3</Col>
          <Col style={Style3} sm={4}>
            2 of 3 (wider)
          </Col>
          <Col style={Style3}>3 of 3</Col>
        </Row>
        <Row className="justify-content-center">
          <Col style={Style4} sm={5} lg="4" xl="2">
            1 of 3
          </Col>
          <Col style={Style4} xs="auto" sm={4} md="auto">
            md="auto"
          </Col>
          <Col style={Style4} sm={3} lg="4" xl="2">
            3 of 3
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TestPage;
