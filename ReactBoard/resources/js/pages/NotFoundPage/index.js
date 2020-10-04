import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const StyledTitle = styled.div`
  font-size: 108px;
  flex: 1;
`;

const NotFoundPage = () => {
  return (
    <StyledDiv className="flex-center position-ref full-height">
      <div className="content">
        <StyledTitle className="m-b-md">404</StyledTitle>
      </div>
    </StyledDiv>
  );
};

export default NotFoundPage;
