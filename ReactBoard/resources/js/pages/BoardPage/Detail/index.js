import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Axios from "axios";
import Button from "../../../components/Button";

const Detail = ({ userInfo, match, history }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // console.log("match.params.detail");
    getBoardsDetail(match.params.detail);
  }, []);

  const getBoardsDetail = (detailId) => {
    Axios({
      method: "get",
      url: `/api/boards/${detailId}`,
      headers: {
        Authorization:
          "Bearer " +
          (userInfo ? (userInfo.token ? userInfo.token : "null") : "null"),
      },
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      <div>heelo</div>
      {data != null && (
        <Container style={{ backgroundColor: "red" }}>
          <Row style={{ backgroundColor: "blue" }}>
            <Col style={{ fontSize: 30 }} className="text-right">
              제목 :{" "}
            </Col>
            <Col style={{ fontSize: 30 }} className="text-left">
              {data.title}
            </Col>
          </Row>
          <Row style={{ minHeight: 300 }}>
            <Col style={{ fontSize: 24 }} className="text-center">
              {data.content}
            </Col>
          </Row>
          <Row style={{ backgroundColor: "gray" }} className="d-flex p-4">
            <Col style={{ backgroundColor: "yellow" }} className="p-2">
              <Button
                onClick={() => {
                  history.go(-1);
                }}
              >
                글목록
              </Button>
            </Col>
            <Col style={{ backgroundColor: "green" }} className="ml-auto p-2">
              <Button
                onClick={() => {
                  alert("로그인이 필요합니다");
                }}
              >
                수정
              </Button>
              <Button
                onClick={() => {
                  alert("로그인이 필요합니다");
                }}
              >
                삭제
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

export default Detail;
