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

const Write = () => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      // console.log(quillInstance.current.editor.delta);
    }, 3000);
  }, []);

  useEffect(() => {
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
  }, []);

  const btn = () => {
    Axios({
      method: "post",
      url: "/api/boards",
      data: {
        id: 1, // user id
        title: "my title",
        content: "Flintstone",
      },
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <StyledDiv>
      <Title placeholder="제목을 작성하세요 ..." />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
      <Button
        onClick={() => {
          console.log("button");
          btn();
        }}
      >
        글 작성
      </Button>
    </StyledDiv>
  );
};

export default Write;
