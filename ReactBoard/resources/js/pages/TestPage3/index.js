import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import {} from "react-bootstrap";

const StyledDiv = styled.div`
  padding: 1rem;
  margin: 1rem;
  border: 1px black solid;
  font-size: 24px;
  background-color: white;
`;

const TestPage3 = ({ match, location, history }) => {
  const [text, setText] = useState("Test Page3");

  useEffect(() => {}, []);

  return (
    <Fragment>
      <div className="container py-1">
        <StyledDiv>{text}</StyledDiv>
        <pre>{JSON.stringify(match, null, 2)}</pre>
        <pre>{JSON.stringify(location, null, 2)}</pre>
        <pre>{JSON.stringify(history, null, 2)}</pre>
      </div>
    </Fragment>
  );
};

export default TestPage3;
