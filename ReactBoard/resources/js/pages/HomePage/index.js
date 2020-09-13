import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const StyledTitle = styled.div`
  font-size: 84px;
  flex: 1;
`;

const HomePage = () => {
  return (
    <StyledDiv className="flex-center position-ref full-height">
      <div className="content">
        <StyledTitle className="m-b-md">React Board</StyledTitle>
      </div>
    </StyledDiv>
  );
};

export default HomePage;
