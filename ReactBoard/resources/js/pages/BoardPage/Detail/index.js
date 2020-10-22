import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Axios from "axios";

const Detail = ({ match, location, history }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("match.params.detail");
    getBoardsDetail(match.params.detail);
  }, []);

  const getBoardsDetail = (detailId) => {
    console.log("detailId");
    console.log(detailId);
    Axios({
      method: "get",
      url: `/api/boards/${detailId}`,
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
        <Container>
          <Row>
            <Col style={{ fontSize: 30 }} className="text-right">
              제목 :{" "}
            </Col>
            <Col style={{ fontSize: 30 }} className="text-left">
              {data.title}
            </Col>
          </Row>
          <Row>
            <Col style={{ fontSize: 24 }} className="text-center">
              {data.content}
            </Col>
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

export default Detail;
