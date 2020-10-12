import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Table, Pagination } from "react-bootstrap";
import Axios from "axios";

const Boards = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const [firstPageUrl, setFirstPageUrl] = useState(null);
  const [lastPageUrl, setLastPageUrl] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [total, setTotal] = useState(null);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    getBoards();
    // (() => {
    //   Axios({
    //     method: "get",
    //     url: "/api/boards",
    //     params: {
    //       page: 0,
    //     },
    //   })
    //     .then((res) => {
    //       setPosts(res.data.data);
    //       console.log(res.data);
    //       console.log(res.data.total);
    //       console.log("hello");
    //       setFirstPageUrl(res.data.first_page_url);
    //       setLastPageUrl(res.data.last_page_url);
    //       setNextPageUrl(res.data.next_page_url);
    //       setPrevPageUrl(res.data.prev_page_url);
    //       setTotal(res.data.total);
    //     })
    //     .catch((error) => console.log(error));
    // })();
  }, []);
  const getBoards = (pageNumber) => {
    const getPage = pageNumber;
    Axios({
      method: "get",
      url: "/api/boards",
      params: {
        page: getPage,
      },
    })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.total);
        console.log("res.data.total");
        console.log(Math.ceil(res.data.total / 10));
        // setPosts(res.data.data);
        setFirstPageUrl(res.data.first_page_url);
        // setLastPageUrl(res.data.last_page_url);
        // setNextPageUrl(res.data.next_page_url);
        // setPrevPageUrl(res.data.prev_page_url);
        // setTotal(res.data.total);
      })
      .catch((error) => console.log(error));
  };

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
          <td>{posts[cnt].title}</td>
          <td className="text-center">{posts[cnt].user_id}</td>
          <td className="text-center">{posts[cnt].updated_at}</td>
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

    console.log("호출");

    for (let cn = 1; cn <= 5; cn++) {
      items.push(
        <Pagination.Item
          key={cn}
          active={cn === currentPage}
          onClick={() => {
            getBoards(cn);
          }}
        >
          {cn}
        </Pagination.Item>
      );
    }

    return (
      <div>
        <Pagination className="justify-content-center">
          {currentPage >= 11 && (
            <Fragment>
              <Pagination.First onClick={() => getBoards(0)} />
              <Pagination.Prev />
            </Fragment>
          )}
          {items}
          <Pagination.Next />
          <Pagination.Last
            onClick={() => getBoards(Math.ceil(res.data.total / 10))}
          />
        </Pagination>
      </div>
    );
  };

  return (
    <Fragment>
      <div style={{ width: 5000, backgroundColor: "red" }}></div>
      {posts.length != 0 && (
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
