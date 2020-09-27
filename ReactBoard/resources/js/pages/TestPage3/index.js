import React, { Fragment, useState, useEffect } from "react";
import { Route, Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { List } from "./List";
import { Detail } from "./Detail";

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
        <StyledDiv>
          <li>
            <NavLink to={`${match.url}/detail`}>페이지1</NavLink>
          </li>
          <li>
            <NavLink to={`${match.url}/list`}>페이지2</NavLink>
          </li>
          <br />
          <Route path={`${match.url}/detail`} component={Detail} />
          <Route path={`${match.url}/list`} component={List} />
          <br />
        </StyledDiv>
        <pre>{JSON.stringify(match, null, 2)}</pre>
        <pre>{JSON.stringify(location, null, 2)}</pre>
        <pre>{JSON.stringify(history, null, 2)}</pre>
      </div>
    </Fragment>
  );
};

export default TestPage3;
