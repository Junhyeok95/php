import React, { Fragment, useState, useEffect } from "react";
import { Route, NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { Badge } from "react-bootstrap";
import List from "./List";
import Detail from "./Detail";

const StyledDiv = styled.div`
  padding: 1rem;
  margin: 1rem;
  border: 1px black solid;
  font-size: 24px;
  background-color: white;
`;

const TestPage3 = ({ match, location, history }) => {
  const [text, setText] = useState("Test Page3");

  console.log(match.url);

  useEffect(() => {}, []);

  return (
    <Fragment>
      <div className="container py-1">
        <StyledDiv>{text}</StyledDiv>
        <StyledDiv>
          <Link to={`${match.url}`}>전체 보기</Link>
        </StyledDiv>
        <StyledDiv>
          <div>
            <Badge variant="Light">
              <Link to={`${match.url}`}>전체 보기</Link>
            </Badge>
            <Badge variant="Light">
              <NavLink
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
                to={`${match.url}/detail`}
              >
                페이지1
              </NavLink>
            </Badge>
            <Badge variant="Light">
              <NavLink
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
                to={`${match.url}/detail2`}
              >
                페이지2
              </NavLink>
            </Badge>
            <Badge variant="Light">
              <NavLink
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
                to={`${match.url}/detail3`}
              >
                페이지3
              </NavLink>
            </Badge>
            <Badge variant="Light">
              <NavLink
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
                to={`${match.url}/detail4`}
              >
                페이지4
              </NavLink>
            </Badge>
            <Badge variant="Light">
              <NavLink
                activeStyle={{
                  fontWeight: "bold",
                  color: "red"
                }}
                to={`${match.url}/detail5`}
              >
                페이지5
              </NavLink>
            </Badge>
          </div>
          <br />
          <Route path={`${match.url}/:detail`} component={Detail} exact />
          <Route path={`${match.url}`} component={List} exact />
          <br />
        </StyledDiv>
        <pre>
          <h1>match</h1>
          {JSON.stringify(match, null, 4)}
        </pre>
        <pre>
          <h1>location</h1>
          {JSON.stringify(location, null, 4)}
        </pre>
        <pre>
          <h1>history</h1>
          {JSON.stringify(history, null, 4)}
        </pre>
      </div>
    </Fragment>
  );
};

export default TestPage3;
