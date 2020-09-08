import React from "react";
import styled from "styled-components";

const StyledBody = styled.div`
  flex: 1;
`;

const Body = ({ children }) => {
  return <StyledBody>{children}</StyledBody>;
};

export default Body;
