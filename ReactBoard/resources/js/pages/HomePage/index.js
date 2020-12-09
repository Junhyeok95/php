import React, { useEffect } from "react";
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
  cursor: pointer;
  &:hover {
    color: #0000ffcc;
  }
`;

const HomePage = ({ history }) => {
  useEffect(() => {
    sessionStorage.clear();
    console.log("sessionStorage.clear() !");
  });
  return (
    <StyledDiv className="flex-center position-ref full-height">
      <div className="content">
        <StyledTitle onClick={() => history.push("/boards")} className="m-b-md">
          React Board
        </StyledTitle>
      </div>
    </StyledDiv>
  );
};

export default HomePage;
