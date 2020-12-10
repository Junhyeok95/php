import React, { Fragment, useState, useEffect, useRef } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import Axios from "axios";
import styled from "styled-components";

const hiddenStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const MyStrong = styled.strong`
  cursor: pointer;
  &:hover {
    color: #0000ff;
  }
`;

const Detail = ({ userInfo, match, history }) => {
  const [data, setData] = useState(null);
  const [comments, setComments] = useState(null);
  const [myComment, setMyComment] = useState("");
  const [btnData, setBtnData] = useState(null);
  const content = useRef();

  useEffect(() => {
    getBoardsDetail(match.params.detail);
  }, []);

  const getComments = (boardId) => {
    Axios({
      method: "get",
      url: `/api/comments/${boardId}`,
    })
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createComment = () => {
    if (userInfo) {
      Axios({
        method: "post",
        url: "/api/comments",
        headers: {
          Authorization:
            "Bearer " +
            (userInfo ? (userInfo.token ? userInfo.token : "null") : "null"),
        },
        data: {
          board_id: data.id,
          content: myComment ? myComment : "null",
        },
      })
        .then((res) => {
          if (res.data) {
            alert("댓글이 작성됬습니다.");
            getComments(match.params.detail);
          } else {
            console.log("댓글 작성 실패");
          }
          setMyComment("");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("로그인 필요");
    }
  };

  // show
  const getBoardsDetail = (detailId) => {
    Axios({
      method: "get",
      url: `/api/boards/${detailId}`,
    })
      .then((res) => {
        setData(res.data);
        content.current.innerHTML = res.data.content;
        setBtnData({
          now: res.data.now,
          prevTitle: res.data.prev_title,
          nextTitle: res.data.next_title,
        });
        getComments(detailId); // 게시판 후 댓글 요청
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
            alert("게시글을 삭제했습니다");
            history.push(`/boards`);
          } else if (res.data === false) {
          }
        })
        .catch((error) => console.log(error));
    } else {
      console.log("자기 글만 삭제 가능");
    }
  };

  const commentsReturn = () => {
    let commentsArr = [];
    for (let i = 0; i < comments.length; i++) {
      commentsArr.push(
        <Row
          className="pt-2"
          style={{
            borderBottom: "solid #73B2FF 1px",
          }}
          key={"commentsArr" + i}
        >
          <Col style={hiddenStyle} className="pl-1 text-left" xs={2}>
            {comments[i].user_name}
          </Col>
          <Col className="pl-1 text-left">{comments[i].content}</Col>
          <Col style={hiddenStyle} className="pl-1 text-right" xs={3} md={2}>
            {comments[i].created_at.slice(5, 16)}
          </Col>
        </Row>
      );
    }

    return <Fragment>{commentsArr}</Fragment>;
  };

  const returnImage = (list) => {
    let imageArr = [];
    for (let i = 0; i < list.length; i++) {
      imageArr.push(
        <Col
          key={"imagege" + i}
          style={{
            overflow: "hidden",
          }}
          xs={12}
          sm={6}
          md={4}
        >
          <Image src={list[i]}></Image>
        </Col>
      );
    }
    return imageArr;
  };

  return (
    <Fragment>
      {data != null && (
        <Container className="pt-3 pb-3" style={{ backgroundColor: "#FFFFFF" }}>
          <Row style={{ borderBottom: "solid #73B2FF 2px" }}>
            <Col>
              <h1 style={{ color: "#154B8D" }}> 게시글 보기</h1>
            </Col>
          </Row>
          <Row
            className="p-1 align-items-center"
            style={{ borderBottom: "solid #73B2FF 1px" }}
          >
            <Col
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: 20,
              }}
            >
              {data && data.title && <strong>{data.title}</strong>}
            </Col>
            <Col style={hiddenStyle} className="text-right " xs={3} md={2}>
              <span>{data.user_name}</span>
            </Col>
            <Col style={hiddenStyle} className="text-right" xs={3} md={2}>
              <span>{data.created_at.slice(0, 10)}</span>
            </Col>
          </Row>
          <Row className="p-1" style={{ borderBottom: "solid #73B2FF 1px" }}>
            <Col className="text-left"></Col>
            <Col className="text-right" xs={3} md={2}>
              <span>조회수 : {data.view}</span>
            </Col>
          </Row>
          <Row className="p-1">
            {data.urls != "" && data.urls != null && returnImage(data.urls)}
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
            <Col className="pb-3">
              {comments && commentsReturn()}
              {userInfo && userInfo.email && (
                <Row className="pt-5">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      createComment();
                    }}
                    style={{ width: "100%" }}
                  >
                    <Form.Row className="align-items-center">
                      <Col style={{ width: "100%" }}>
                        <Form.Control
                          size="sm"
                          type="text"
                          value={myComment}
                          onChange={(e) => {
                            setMyComment(e.target.value);
                          }}
                        />
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => createComment()}
                        >
                          한줄답변
                        </Button>
                      </Col>
                    </Form.Row>
                  </Form>
                </Row>
              )}
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
              <strong>이전글</strong>
            </Col>
            {btnData && (
              <Col style={hiddenStyle} className="text-left">
                <MyStrong
                  onClick={() => {
                    history.push("/boards/detail/" + (btnData.now + 1));
                    getBoardsDetail(btnData.now + 1);
                  }}
                >
                  {btnData.prevTitle}
                </MyStrong>
              </Col>
            )}
          </Row>
          <Row
            className="p-1"
            style={{
              borderBottom: "solid #73B2FF 2px",
            }}
          >
            <Col className="text-left" xs="auto">
              <strong>다음글</strong>
            </Col>
            {btnData && (
              <Col style={hiddenStyle} className="text-left">
                <MyStrong
                  onClick={() => {
                    history.push("/boards/detail/" + (btnData.now - 1));
                    getBoardsDetail(btnData.now - 1);
                  }}
                >
                  {btnData.nextTitle}
                </MyStrong>
              </Col>
            )}
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
            {userInfo && userInfo.name === data.user_name ? (
              <Col className="pr-2" xs="auto">
                <Button
                  variant="outline-success"
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
                  variant="outline-danger"
                  size="sm"
                  onClick={() => {
                    deleteBoardsDetail(data.id);
                  }}
                >
                  삭제하기
                </Button>
              </Col>
            ) : (
              <Col className="pr-2" xs="auto">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => {
                    if (userInfo) {
                      history.push("/boards/write");
                    } else {
                      alert("로그인이 필요합니다");
                    }
                  }}
                >
                  글쓰기
                </Button>
              </Col>
            )}
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

export default Detail;
