import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Table, Pagination } from "react-bootstrap";

const Boards = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    console.log("get table");
  }, []);

  const renderBoardHead = () => {
    return (
      <thead>
        <tr>
          <th scope="col" className="text-center">
            분류
          </th>
          <th scope="col" className="text-center">
            제목
          </th>
          <th scope="col" className="text-center">
            글쓴이
          </th>
          <th scope="col" className="text-center">
            날짜
          </th>
          <th scope="col" className="text-center">
            조회
          </th>
        </tr>
      </thead>
    );
  };

  const renderBoardBody = () => {
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
          <td className="text-center">{board[0][i]}</td>
          <td>{board[1][i]}</td>
          <td className="text-center">{board[2][i]}</td>
          <td className="text-center">{board[3][i]}</td>
          <td className="text-center">{board[4][i]}</td>
        </tr>
      );
    }
    return <tbody>{itemArr}</tbody>;
  };

  const renderPagination = () => {
    // let totalPosts = posts.length;
    let totalPosts = 55;
    let items = [];

    for (let number = 1; number <= 10; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => {
            setCurrentPage(number);
          }}
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
      <div>
        <Pagination className="justify-content-center">
          {currentPage >= 11 && (
            <Fragment>
              <Pagination.First />
              <Pagination.Prev />
            </Fragment>
          )}
          {items}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    );
  };

  return (
    <Fragment>
      <Container>
        <Table striped bordered hover size="sm">
          {renderBoardHead()}
          {renderBoardBody()}
        </Table>
        {renderPagination()}
      </Container>
    </Fragment>
  );
};

export default Boards;
