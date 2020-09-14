import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  margin: 2px;
  outline: none;
  cursor: pointer;

  color: ${props => props.color || "black"};
  background: ${props => props.background || "#8DFCFF"};
  &:hover {
    background: #62b0b2;
  }
`;

const Button = props => <StyledButton {...props} />;

export default Button;
