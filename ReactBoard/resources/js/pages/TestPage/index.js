import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  padding: 3rem;
  border: 1px black solid;
  font-size: 72px;
  background-color: white;
`;

const TestPage = () => {
  const [text, setText] = useState("Test Page");

  useEffect(() => {
    console.log("Test Page");
  }, []);

  return (
    <div className="container py-4">
      <StyledDiv>{text}</StyledDiv>
    </div>
  );
};

export default TestPage;
