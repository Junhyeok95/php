import React from "react";
import { Container, Row, Col, Jumbotron, Button } from "react-bootstrap";

const MainPage = ({ history }) => {
    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <Jumbotron>
                        <h1>神田ユニフォーム店</h1>
                        <p>ユニフォーム受注、管理システムです。</p>
                        <p>
                            <Button
                                variant="primary"
                                onClick={() => history.push("/product")}
                            >
                                詳細はこちら
                            </Button>
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
};

export default MainPage;
