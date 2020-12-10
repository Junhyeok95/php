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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Write = ({ userInfo, match, history, action }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [text, setText] = useState(null);

  const onClickHandler = (e) => {
    const formData = new FormData();
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++)
        formData.append("file" + i, selectedFiles[i]);
    }
    console.log(setSelectedFiles.length);
    formData.append("title", "myTitle");
    formData.append("content", "myContent");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization:
          "Bearer " +
          (userInfo ? (userInfo.token ? userInfo.token : "null") : "null"),
      },
    };
    Axios.post(`/api/boards`, formData, config);
  };
  const fileChangedHandler = (e) => {
    e.preventDefault();
    setSelectedFiles(e.target.files);
  };

  useEffect(() => {
    console.log("useEffect");
  }, []);

  return (
    <Fragment>
      <div className="App" style={{ marginTop: "100px" }}>
        <input type="file" multiple onChange={fileChangedHandler} />
        <button onClick={onClickHandler}>저장하기</button>
      </div>
    </Fragment>
  );
};

export default Write;
