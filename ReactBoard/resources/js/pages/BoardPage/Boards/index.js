import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Table, Pagination } from "react-bootstrap";
import Axios from "axios";

const Boards = () => {
  const [perPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);

  // const indexOfLastPost = currentPage * perPage;
  // const indexOfFirstPost = indexOfLastPost - perPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = (pageNumber) => {
    console.log("호출 get -------------------------------");

    const getPage = pageNumber;
    Axios({
      method: "get",
      url: "/api/boards",
      params: {
        page: getPage,
      },
    })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        console.log(Math.ceil(res.data.total / 10));
        console.log(res.data.current_page);
        setCurrentPage(res.data.current_page);

        console.log("호출 끝 get ====================");
      })
      .catch((error) => console.log(error));
  };

  const renderBoardHead = () => {
    console.log("호출1");

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
    console.log("호출2");

    // 분류, 제목, 글쓴이, 날짜, 조회수
    let itemArr = [];
    for (let i = 0; i < perPage; i++) {
      itemArr.push(
        <tr key={"BoardBody" + i}>
          <td className="text-center">{i}</td>
          <td>{data.data[i].title}</td>
          <td className="text-center">{data.data[i].user_id}</td>
          <td className="text-center">{data.data[i].updated_at}</td>
          <td className="text-center">{0}</td>
        </tr>
      );
    }
    return <tbody>{itemArr}</tbody>;
  };

  const renderPagination = () => {
    console.log("호출3");

    let items = [];
    for (let i = 1; i <= 5; i++) {
      items.push(
        <Pagination.Item
          key={"Pagination" + i}
          active={i == currentPage}
          onClick={() => {
            getBoards(i);
          }}
        >
          {i}
        </Pagination.Item>
      );
    }

    return (
      <div>
        <Pagination className="justify-content-center">
          {data.current_page >= 11 && (
            <Fragment>
              <Pagination.First onClick={() => getBoards(0)} />
              <Pagination.Prev
                onClick={() => {
                  console.log("prev!");
                }}
              />
            </Fragment>
          )}
          {items}
          <Pagination.Next
            onClick={() => {
              console.log("next!");
            }}
          />
          <Pagination.Last
            onClick={() => getBoards(Math.ceil(data.total / 10))}
          />
        </Pagination>
      </div>
    );
  };

  return (
    <Fragment>
      <div style={{ width: 5000, backgroundColor: "red" }}></div>
      {data != null && (
        <Container>
          <Table striped bordered hover size="sm">
            {renderBoardHead()}
            {renderBoardBody()}
          </Table>
          {renderPagination()}
        </Container>
      )}
    </Fragment>
  );
};

export default Boards;
