import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00008844;
  color: #ffffff;
`;
const StyledText = styled.div`
  font-size: 20px;
`;

const Footer = () => {
  return (
    <StyledDiv>
      <StyledText>
        <footer className=""> footer </footer>
      </StyledText>
    </StyledDiv>
  );
};

export default Footer;
