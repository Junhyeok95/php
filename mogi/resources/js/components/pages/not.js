import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;
const StyledTitle = styled.div`
    font-size: 48px;
    flex: 1;
`;
const StyledContent = styled.div`
    font-size: 24px;
    flex: 1;
`;
const StyledButton = styled.button`
    width: 100%;
`;

const NotFoundPage = ({ history }) => {
    return (
        <StyledDiv className="flex-center position-ref full-height">
            <div className="content">
                <StyledTitle className="m-b-md text-center">
                    404 Not Found
                </StyledTitle>
                <StyledContent className="m-b-md text-center">
                    {window.location.href}
                </StyledContent>
                <StyledButton
                    onClick={() =>
                        history.location.pathname == "/"
                            ? history.push("/product")
                            : history.go(-1)
                    }
                >
                    戻る
                </StyledButton>
            </div>
        </StyledDiv>
    );
};

export default NotFoundPage;
