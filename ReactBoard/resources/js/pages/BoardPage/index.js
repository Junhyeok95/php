import React from "react";
import Button from "../../components/Button";
import Write from "./Write";

const BoardPage = () => {
  return (
    <div>
      <h3>
        게시판<Button>버튼</Button>
      </h3>

      <Write />
    </div>
  );
};

export default BoardPage;
