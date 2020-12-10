import React, { useRef, useEffect, useState, Fragment } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // bubble.css
import Axios from "axios";

const hiddenStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};
const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 0px;
  }
`;

const Write = ({ userInfo, match, history, action }) => {
  const today = new Date();
  const quillElement = useRef(null);
  const quillInstance = useRef(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (action === "update") {
      Axios.get(`/api/boards/${match.params.detail}/edit`).then((res) => {
        setTitle(res.data.title);
        setData(res.data);
      });
    } else {
      Axios.get("/api/boards/create").then((res) => {
        setData(res.data);
      });
    }
  }, []);

  useEffect(() => {
    if (quillElement.current) {
      quillInstance.current = new Quill(quillElement.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: 1 }, { header: 2 }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block", "image"],
          ],
        },
      });
      const quill = quillInstance.current;
      quill.on("text-change", function (delta, oldDelta, source) {
        if (source == "user") {
          setContent(quill.root.innerHTML);
        }
      });
    }
    return () => {
      // console.log("리턴");
    };
  }, [data]);

  const fileChangedHandler = (e) => {
    e.preventDefault();
    setSelectedFiles(e.target.files);
  };

  const storeHandler = () => {
    if (userInfo) {
      const formData = new FormData();
      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++)
          formData.append("file" + i, selectedFiles[i]);
      }
      formData.append("title", title);
      formData.append("content", content);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization:
            "Bearer " +
            (userInfo ? (userInfo.token ? userInfo.token : "null") : "null"),
        },
      };
      Axios.post(`/api/boards`, formData, config)
        .then((res) => {
          if (res.data) {
            // console.log("게시판 작성 성공");
            history.push(`/boards`);
            alert("작성완료");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const updateHandler = () => {
    setContent(quillInstance.current.root.innerHTML);
    if (userInfo) {
      Axios({
        method: "put",
        url: `/api/boards/${match.params.detail}`,
        headers: {
          Authorization:
            "Bearer " +
            (userInfo ? (userInfo.token ? userInfo.token : "null") : "null"),
        },
        data: {
          title: title,
          content: content,
        },
      })
        .then((res) => {
          if (res.data === true) {
            // console.log("게시판 수정 성공");
            history.push(`/boards`);
            alert("저장완료");
          }
        })
        .catch((err) => console.log(err));
    }
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
          sm={4}
        >
          <Image src={list[i]}></Image>
        </Col>
      );
    }
    return imageArr;
  };

  return (
    <Fragment>
      {userInfo != null && data != null && (
        <Container className="pt-3 pb-3" style={{ backgroundColor: "#FFFFFF" }}>
          <Row style={{ borderBottom: "solid #73B2FF 2px" }}>
            <Col>
              <h1 style={{ color: "#154B8D" }}>
                {" "}
                게시글 {action && action === "update" ? "수정하기" : "작성하기"}
              </h1>
            </Col>
          </Row>
          <Row
            className="p-1  align-items-center"
            style={{ borderBottom: "solid #73B2FF 1px" }}
          >
            <Col style={hiddenStyle}>
              <Form.Control
                type="text"
                name="title"
                placeholder={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Col>
            <Col style={hiddenStyle} className="text-right" xs={3} md={3}>
              <span>{JSON.parse(localStorage.getItem("user")).name}</span>
            </Col>
            <Col style={hiddenStyle} className="text-right" xs={3} md={2}>
              <span>{today.toLocaleTimeString()}</span>
            </Col>
          </Row>
          {action !== "update" && (
            <Row className="p-1" style={{ borderBottom: "solid #73B2FF 1px" }}>
              <Col className="text-right" xs={3} md={2}>
                <input type="file" multiple onChange={fileChangedHandler} />
              </Col>
              <Col className="text-right"></Col>
            </Row>
          )}
          {action === "update" && (
            <Row className="p-1">
              {data.urls != "" && data.urls != null && returnImage(data.urls)}
            </Row>
          )}
          <Row className="p-1 mt-2">
            <Col>
              <QuillWrapper>
                <div ref={quillElement} />
              </QuillWrapper>
            </Col>
          </Row>
          <Row
            className="p-1 mt-2"
            style={{
              borderBottom: "solid #73B2FF 2px",
            }}
          >
            <Col className="text-left" xs="auto"></Col>
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
            {action === "update" ? (
              <Col className="pr-2" xs="auto">
                <Button variant="primary" size="sm" onClick={updateHandler}>
                  저장하기
                </Button>
                <Button
                  className="ml-2"
                  variant="outline-danger"
                  size="sm"
                  onClick={() => history.go(-1)}
                >
                  취소하기
                </Button>
              </Col>
            ) : (
              <Col className="pr-2" xs="auto">
                <Button variant="primary" size="sm" onClick={storeHandler}>
                  작성완료
                </Button>
              </Col>
            )}
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

export default Write;
