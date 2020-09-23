import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { ListGroup } from "react-bootstrap";

const StyledDiv = styled.div`
  padding: 3rem;
  border: 1px black solid;
  font-size: 72px;
  background-color: white;
`;

const TestPage2 = () => {
  const [text, setText] = useState("Test Page2");

  useEffect(() => {
    console.log("Test Page");
  }, []);

  return (
    <Fragment>
      <div className="container py-4">
        <StyledDiv>{text}</StyledDiv>
      </div>
      <div>
        <ListGroup>
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
      </div>
    </Fragment>
  );
};

export default TestPage2;
