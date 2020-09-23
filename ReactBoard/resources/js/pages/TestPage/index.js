import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

const StyledDiv = styled.div`
  padding: 3rem;
  border: 1px black solid;
  font-size: 18px;
  background-color: white;
`;

const TestPage = () => {
  const [text, setText] = useState("Test Page");

  useEffect(() => {
    console.log("Test Page");
  }, []);

  return (
    <div className="container py-4">
      <StyledDiv>
        <Container>
          <Row>
            <Col>1 of 1</Col>
            <Col>1 of 1</Col>
            <Col>1 of 1</Col>
          </Row>
          <Row>
            <Col>1 of 1</Col>
            <Col>1 of 1</Col>
            <Col>1 of 1</Col>
          </Row>
        </Container>
      </StyledDiv>
      <StyledDiv>
        <Container>
          <Row>
            <Col>1 of 1</Col>
            <Col>1 of 1</Col>
            <Col>1 of 1</Col>
          </Row>
          <Row>
            <Col>1 of 1</Col>
            <Col>1 of 1</Col>
            <Col>1 of 1</Col>
          </Row>
        </Container>
      </StyledDiv>
    </div>
  );
};

export default TestPage;
