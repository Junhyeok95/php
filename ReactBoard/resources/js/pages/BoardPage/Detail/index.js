import React, { Fragment, useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Axios from "axios";

const hiddenStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const Detail = ({ userInfo, match, history }) => {
  const [data, setData] = useState(null);
  const content = useRef();

  useEffect(() => {
    getBoardsDetail(match.params.detail);
  }, []);

  // show
  const getBoardsDetail = (detailId) => {
    Axios({
      method: "get",
      url: `/api/boards/${detailId}`,
    })
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
        content.current.innerHTML = res.data.content;
      })
      .catch((error) => console.log(error));
  };

  // destroy
  const deleteBoardsDetail = (detailId) => {
    if (userInfo && userInfo.name === data.user_name) {
      Axios({
        method: "delete",
        url: `/api/boards/${detailId}`,
        headers: {
          Authorization:
            "Bearer " +
            (userInfo ? (userInfo.token ? userInfo.token : "null") : "null"),
        },
      })
        .then((res) => {
          if (res.data === true) {
            console.log("게시판 삭제 성공");
            history.push(`/boards`);
          } else if (res.data === false) {
            console.log("게시판 삭제 실패");
          }
        })
        .catch((error) => console.log(error));
    } else {
      console.log("자기 글만 삭제 가능");
    }
  };

  return (
    <Fragment>
      {data != null && (
        <Container className="pt-3 pb-3" style={{ backgroundColor: "#FFFFFF" }}>
          <Row style={{ borderBottom: "solid #73B2FF 2px" }}>
            <Col>
              <h3 style={{ color: "#154B8D" }}> 게시글 보기</h3>
            </Col>
          </Row>
          <Row className="p-1" style={{ borderBottom: "solid #73B2FF 1px" }}>
            <Col style={hiddenStyle}>
              <strong>{data.title}</strong>
            </Col>
            <Col style={hiddenStyle} className="text-right " xs={3} md={2}>
              {data.user_name}
            </Col>
            <Col style={hiddenStyle} className="text-right" xs={3} md={2}>
              {data.created_at.slice(0, 10)}
            </Col>
          </Row>
          <Row className="p-1" style={{ borderBottom: "solid #73B2FF 1px" }}>
            <Col className="text-left"></Col>
            <Col className="text-right" xs={3} md={2}>
              조회수 : {data.view}
            </Col>
          </Row>
          <Row className="p-1" style={{ minHeight: "200px" }}>
            <Col ref={content}>{/*data.content*/}</Col>
          </Row>
          <Row
            className="p-2 mb-3"
            style={{
              border: "solid #E0E0E0 3px",
            }}
          >
            <Col>
              <Row
                className="pt-2"
                style={{
                  borderBottom: "solid #73B2FF 1px",
                }}
              >
                <Col className="pl-1" xs={2}>
                  댓글 작성자
                </Col>
                <Col
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  className="pl-1"
                >
                  출석완료
                </Col>
              </Row>

              <Row className="pt-5 pb-2">
                <Form style={{ width: "100%" }}>
                  <Form.Row className="align-items-center">
                    <Col style={{ width: "100%" }}>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Small text"
                      />
                    </Col>
                    <Col xs="auto">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => console.log("haha")}
                      >
                        한줄답변
                      </Button>
                    </Col>
                  </Form.Row>
                </Form>
              </Row>
            </Col>
          </Row>
          <Row
            className="p-1"
            style={{
              borderTop: "solid #73B2FF 2px",
              borderBottom: "solid #73B2FF 1px",
            }}
          >
            <Col className="text-left" xs="auto">
              <strong>이전</strong>
            </Col>
            <Col className="text-left">ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</Col>
          </Row>
          <Row
            className="p-1"
            style={{
              borderBottom: "solid #73B2FF 2px",
            }}
          >
            <Col className="text-left" xs="auto">
              <strong>다음</strong>
            </Col>
            <Col className="text-left">ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</Col>
          </Row>
          <Row className="p-1 pt-2 justify-content-between">
            <Col className="pl-2" xs="auto">
              <Button
                variant="outline-dark"
                size="sm"
                onClick={() => history.push(`/boards`)}
              >
                목록으로
              </Button>
            </Col>
            {userInfo && userInfo.name === data.user_name && (
              <Col className="pr-2" xs="auto">
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={() => {
                    // edit
                    if (userInfo && userInfo.name === data.user_name) {
                      history.push(`/boards/${match.params.detail}/write`);
                    } else {
                      console.log("자기 글만 수정가능");
                    }
                  }}
                >
                  수정하기
                </Button>
                <Button
                  className="ml-2"
                  variant="outline-dark"
                  size="sm"
                  onClick={() => {
                    deleteBoardsDetail(data.id);
                  }}
                >
                  삭제하기
                </Button>
              </Col>
            )}
          </Row>
        </Container>

        // <Container style={{ backgroundColor: "#FF0000" }}>
        //   <Row>
        //     <Col
        //       style={{
        //         padding: "2px",
        //         border: "solid black 2px",
        //         fontSize: 20,
        //       }}
        //       className="col-sm-2 text-center"
        //     >
        //       제목{" "}
        //     </Col>
        //     <Col
        //       style={{
        //         padding: "2px",
        //         border: "solid black 2px",
        //         fontSize: 20,
        //       }}
        //       className="pl-2 text-left"
        //     >
        //       {data.title}
        //     </Col>
        //   </Row>
        // <Row>
        //   <Col ref={content} style={{ fontSize: 16 }} className="p-4">
        //     {/* content.current.innerHTML */}
        //   </Col>
        // </Row>
        //   <Row style={{ border: "2px solid black" }} className="d-flex p-1">
        //     <Col
        //       // style={{ backgroundColor: "yellow" }}
        //       className="p-1"
        //     >
        //       <Button
        //         onClick={() => {
        //           history.push(`/boards`);
        //         }}
        //       >
        //         글 목록
        //       </Button>
        //     </Col>
        //     <Col
        //       // style={{ backgroundColor: "green" }}
        //       className="d-flex justify-content-end p-1"
        //     >
        //       <Button
        // onClick={() => {
        //   history.push(`/boards/${match.params.detail}/write`);
        // }}
        //       >
        //         수정
        //       </Button>
        //       <Button
        // onClick={() => {
        //   deleteBoardsDetail(match.params.detail);
        // }}
        //       >
        //         삭제
        //       </Button>
        //     </Col>
        //   </Row>
        // </Container>
      )}
    </Fragment>
  );
};

export default Detail;
