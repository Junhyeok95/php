import React, { useRef, useEffect, useState, Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Button from "../../../components/Button";
import Axios from "axios";
// import "quill/dist/quill.bubble.css";

const StyledDiv = styled.div`
  padding: 2rem;
  border: 1px black solid;
  background-color: white;
`;
const Title = styled.input`
  font-size: 2rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px black solid;
  margin-bottom: 2rem;
  width: 50%;
`;
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
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  // 이게 아닌거같은데 .. ?
  const [WriteData, setWriteData] = useState({
    data: { title: "null", content: "null" },
  });

  useEffect(() => {
    if (quillElement.current) {
      quillInstance.current = new Quill(quillElement.current, {
        // theme: "bubble",
        theme: "snow",
        placeholder: "내용을 작성하세요 ...",
        modules: {
          toolbar: [
            [{ header: 1 }, { header: 2 }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block", "link", "image"],
          ],
        },
      });

      const quill = quillInstance.current;
      quill.on("text-change", function (delta, oldDelta, source) {
        if (source == "api") {
          console.log("An API call triggered this change.");
        } else if (source == "user") {
          // console.log(quill.root.innerHTML);
          let _WriteData = WriteData;
          _WriteData.data.content = quill.root.innerHTML;
          setWriteData(_WriteData);
        }
      });
    }
    if (action === "create") {
      console.log("create API 호출");
    } else if (action === "update") {
      console.log("update API 호출");
    }
  }, []);

  const storeBtn = () => {
    if (userInfo) {
      Axios({
        method: "post",
        url: "/api/boards",
        headers: {
          Authorization:
            "Bearer " +
            (userInfo ? (userInfo.token ? userInfo.token : "null") : "null"),
        },
        data: {
          title: WriteData.data.title,
          content: WriteData.data.content,
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("로그인 필요");
    }
  };

  const updateBtn = (detailId) => {
    if (userInfo) {
      Axios({
        method: "put",
        url: `/api/boards/${detailId}`,
        headers: {
          Authorization:
            "Bearer " +
            (userInfo ? (userInfo.token ? userInfo.token : "null") : "null"),
        },
        data: {
          title: WriteData.data.title,
          content: WriteData.data.content,
        },
      })
        .then((res) => {
          console.log(res.data);
          // console.log(`/boards/detail/${match.params.detail}`);
          history.push(`/boards/detail/${match.params.detail}`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("로그인 필요");
    }
  };

  const deleteBtn = (detailId) => {
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
        console.log(res);
        if (res.data === true) {
          history.go(-1);
        }
      })
      .catch((error) => console.log(error));
  };

  const getCreate = (detailId) => {
    Axios({
      method: "get",
      url: `/api/boards/${300}`,
      headers: {
        Authorization:
          "Bearer " +
          (userInfo ? (userInfo.token ? userInfo.token : "null") : "null"),
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getEdit = (detailId) => {
    Axios({
      method: "get",
      url: `/api/boards/${300}/edit`,
      headers: {
        Authorization:
          "Bearer " +
          (userInfo ? (userInfo.token ? userInfo.token : "null") : "null"),
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <StyledDiv>
      <Title
        placeholder="제목을 작성하세요 ..."
        onChange={(e) => {
          // console.log(e.target.value); // current.value
          let _WriteData = WriteData;
          _WriteData.data.title = e.target.value;
          setWriteData(_WriteData);
        }}
      />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
      <Row className="pt-2">
        <Col className="d-flex justify-content-start">
          <Button
            onClick={() => {
              history.go(-1);
            }}
          >
            글 목록
          </Button>
        </Col>
        <Col className="d-flex justify-content-end">
          {action === "update" ? (
            <Fragment>
              <Button
                onClick={() => {
                  updateBtn(match.params.detail);
                  console.log(WriteData);
                }}
              >
                저장
              </Button>
              <Button
                onClick={() => {
                  updateBtn(match.params.detail);
                  console.log(WriteData);
                }}
              >
                삭제
              </Button>
            </Fragment>
          ) : (
            <Button
              onClick={() => {
                storeBtn();
              }}
            >
              작성
            </Button>
          )}
        </Col>
      </Row>
    </StyledDiv>
  );
};

export default Write;
