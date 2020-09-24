import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Container,
  Row,
  Col,
  // Overview
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

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
      <StyledDiv>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </StyledDiv>
    </div>
  );
};

export default TestPage;
