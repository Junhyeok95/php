import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { Table, Pagination } from "react-bootstrap";

const StyledDiv = styled.div`
  padding: 1rem;
  margin: 1rem;
  border: 1px black solid;
  font-size: 24px;
  background-color: white;
`;

const TestPage2 = () => {
  const [text, setText] = useState("Test Page2");

  useEffect(() => {
    console.log("Test Page");

    for (let i = 0; i < 10; i++) {}
  }, []);

  const renderItem = () => {
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

  return (
    <Fragment>
      <div className="container py-1">
        <StyledDiv>{text}</StyledDiv>
      </div>
      <div>
        <StyledDiv>Small Table</StyledDiv>
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
          <tbody>{renderItem()}</tbody>
        </Table>
      </div>
      <div>
        <StyledDiv>Pagination</StyledDiv>
        <div style={{ backgroundColor: "red" }}>
          <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />

            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item disabled>{14}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </div>
      </div>
    </Fragment>
  );
};

export default TestPage2;
