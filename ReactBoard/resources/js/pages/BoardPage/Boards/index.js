import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Table, Pagination } from "react-bootstrap";
import Axios from "axios";

const Boards = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [nextPageUrl, setNextPageUrl] = useState();

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    (() => {
      Axios({
        method: "get",
        url: "/api/boards"
      })
        .then(res => {
          console.log("api boards get response");
          console.log(res);
          console.log(res.data);
          setPosts(res.data);
        })
        .catch(error => console.log(error));
    })();
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
    let itemArr = [];
    for (let cnt = indexOfFirstPost; cnt < indexOfLastPost; cnt++) {
      itemArr.push(
        <tr key={cnt}>
          <td className="text-center">{cnt + 1}</td>
          <td>{posts.data[cnt].title}</td>
          <td className="text-center">{posts.data[cnt].user_id}</td>
          <td className="text-center">{posts.data[cnt].updated_at}</td>
          <td className="text-center">{0}</td>
        </tr>
      );
    }
    return <tbody>{itemArr}</tbody>;
  };

  const renderPagination = () => {
    // let totalPosts = posts.length;
    let totalPosts = 55;
    let items = [];

    for (let number = 1; number <= 25; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => {
            (() => {
              Axios({
                method: "get",
                url: "/api/boards",
                params: {
                  page: number
                }
              })
                .then(res => {
                  console.log(res.data);
                  setPosts(res.data);
                })
                .catch(error => console.log(error));
            })();
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
      {nextPageUrl}
      {posts.length != 0 && (
        <Container>
          {JSON.stringify(posts[0])}
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
