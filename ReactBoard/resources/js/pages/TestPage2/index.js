import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Table, Pagination } from "react-bootstrap";

const StyledDiv = styled.div`
  padding: 0.5rem;
  margin: 1rem;
  border: 1px black solid;
  font-size: 24px;
  background-color: white;
`;

const TestPage2 = () => {
  const [text, setText] = useState("Test Page2");

  useEffect(() => {
    console.log("Test Page2");
  }, []);

  const renderBoardItem = () => {
    // 분류, 제목, 글쓴이, 날짜, 조회수
    const [board, setBoard] = useState([
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    ]);

    let itemArr = [];
    for (let i = 0; i < 10; i++) {
      itemArr.push(
        <tr key={i}>
          <th>{board[0][i]}</th>
          <th>{board[1][i]}</th>
          <th>{board[2][i]}</th>
          <th>{board[3][i]}</th>
          <th>{board[4][i]}</th>
        </tr>
      );
    }
    return itemArr;
  };

  const renderPaginationItem = () => {
    const [paginationActive, setPaginationActive] = useState(1);
    let items = [];

    for (let number = 1; number <= 9; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === paginationActive}
          onClick={() => {
            setPaginationActive(number);
            console.log(number);
          }}
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
      <div style={{ backgroundColor: "red" }}>
        <Pagination className="justify-content-center">
          <Pagination.First />
          <Pagination.Prev />
          {items}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    );
  };

  return (
    <Fragment>
      <div>
        <StyledDiv>{text}</StyledDiv>
      </div>
      <div>
        <StyledDiv>Small Table</StyledDiv>
        <Container>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>분류</th>
                <th>제목</th>
                <th>글쓴이</th>
                <th>날짜</th>
                <th>조회</th>
              </tr>
            </thead>
            <tbody>{renderBoardItem()}</tbody>
          </Table>
        </Container>
      </div>
      <div>
        <StyledDiv>Pagination</StyledDiv>
        <Container>{renderPaginationItem()}</Container>
      </div>
    </Fragment>
  );
};

export default TestPage2;
