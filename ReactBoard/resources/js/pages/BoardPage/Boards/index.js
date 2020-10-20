import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Table, Pagination } from "react-bootstrap";
import Axios from "axios";

const Boards = () => {
  const [perPage] = useState(10);
  const [paging] = useState(8);
  const [data, setData] = useState(null);
  const [look, setLook] = useState(0);

  useEffect(() => {
    getBoards();
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
        setData(res.data);
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
    for (let i = 0; i < data.data.length; i++) {
      itemArr.push(
        <tr
          key={"BoardBody" + i}
          onClick={() => {
            Axios({
              method: "get",
              url: `/api/boards/${data.data[i].id}`,
            })
              .then((res) => {
                console.log(res);
                console.log(res.data);
              })
              .catch((error) => console.log(error));
          }}
        >
          <td className="text-center">{i}</td>
          <td style={{ cursor: "pointer" }}>{data.data[i].title}</td>
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
    const firstPaging = look * paging + 1;
    const lastPaging =
      (look + 1) * paging > Math.ceil(data.total / data.per_page)
        ? Math.ceil(data.total / data.per_page)
        : (look + 1) * paging;
    let items = [];

    for (let i = firstPaging; i <= lastPaging; i++) {
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
          {look > 0 && (
            <Pagination.First
              onClick={() => {
                getBoards(0);
                setLook(0);
              }}
            />
          )}
          {data.current_page > 1 && (
            <Pagination.Prev
              onClick={() => {
                getBoards(data.current_page - 1);
                if (data.current_page == look * paging + 1) {
                  setLook(look - 1);
                }
              }}
            />
          )}
          {items}
          {data.current_page != Math.ceil(data.total / data.per_page) && (
            <Fragment>
              <Pagination.Next
                onClick={() => {
                  getBoards(data.current_page + 1);
                  if (data.current_page == (look + 1) * paging) {
                    setLook(look + 1);
                  }
                }}
              />
              <Pagination.Last
                onClick={() => {
                  getBoards(Math.ceil(data.total / data.per_page));
                  const point =
                    Math.ceil(data.total / data.per_page) % paging == 0 ? 1 : 0; // 마법소스
                  setLook(
                    parseInt(Math.ceil(data.total / data.per_page) / paging) -
                      point
                  );
                }}
              />
            </Fragment>
          )}
        </Pagination>
      </div>
    );
  };

  return (
    <Fragment>
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
