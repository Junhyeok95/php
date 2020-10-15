import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Table, Pagination } from "react-bootstrap";
import Axios from "axios";

const Boards = () => {
  const [perPage] = useState(20);
  const [data, setData] = useState(null);
  const [look, setLook] = useState(1);

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
        console.log("막페 : " + Math.ceil(res.data.total / res.data.per_page));
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
          <td className="text-center">
            {data.data[i].updated_at.slice(5, 10) +
              " " +
              data.data[i].updated_at.slice(11, 16)}
          </td>
          <td className="text-center">{0}</td>
        </tr>
      );
    }
    return <tbody>{itemArr}</tbody>;
  };

  const renderPagination = () => {
    console.log("호출3");

    let items = [];
    for (let i = look; i <= look + 9; i++) {
      items.push(
        <Pagination.Item
          key={"Pagination" + i}
          active={i == data.current_page}
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
            <Pagination.First onClick={() => getBoards(0)} />
          )}
          {data.current_page > 1 && (
            <Pagination.Prev
              onClick={() => {
                getBoards(data.current_page - 1);
              }}
            />
          )}
          {items}
          <Pagination.Next
            onClick={() => {
              getBoards(data.current_page + 1);
              if (data.current_page % 10 == 0) {
                setLook(data.current_page + 1);
              }
            }}
          />
          <Pagination.Last
            onClick={() => getBoards(Math.ceil(data.total / data.per_page))}
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
