import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Button from "../../../components/Button";
import Axios from "axios";
// import "quill/dist/quill.bubble.css";

const StyledDiv = styled.div`
  padding: 3rem;
  border: 1px black solid;
  background-color: white;
`;
const Title = styled.input`
  font-size: 3rem;
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

const Write = ({ userInfo }) => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      // console.log(quillInstance.current.editor.delta);
    }, 3000);
  }, []);

  useEffect(() => {
    if (quillElement.current) {
      quillInstance.current = new Quill(quillElement.current, {
        // theme: "bubble", // snow
        theme: "snow", // snow
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
          console.log(quill.root.innerHTML);
          console.log("이걸 .. 어떻게 .. 잘 .. 하면 .. 저장 .. 될 .. 텐데 ..");
        }
      });
    }
  }, []);

  const postBtn = () => {
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
          title: "my title",
          content: "Flintstone",
        },
      })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("로그인 필요");
    }
  };

  return (
    <StyledDiv>
      <Title placeholder="제목을 작성하세요 ..." />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
      <Button
        onClick={() => {
          postBtn();
        }}
      >
        글 작성
      </Button>
    </StyledDiv>
  );
};

export default Write;
