import React, { Fragment } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const ProductHome = ({ history }) => {
    const productCard = () => {
        const url = ["A", "B", "C", "D", "E"];
        let cardArr = [];

        for (let i = 0; i < 5; i++) {
            cardArr.push(
                <Col
                    key={"productCard" + i}
                    className="justify-content-center align-items-center p-2 m-0"
                    xs={{ span: 8, offset: 2 }}
                    sm={{ span: 6, offset: 0 }}
                    md={{ span: 4, offset: 0 }}
                    lg={{ span: 3, offset: 0 }}
                    xl={{}}
                >
                    <Card className="justify-content-center align-items-center p-1 pt-3">
                        <Card.Img variant="top" src={`/images/${url[i]}.png`} />
                        <Card.Body>
                            <Card.Title className="text-center">
                                {"ユニフォーム"}
                            </Card.Title>
                            <Card.Title className="text-center">
                                {url[i] + " 商品"}
                            </Card.Title>
                            <Button
                                variant="success"
                                className="w-100"
                                onClick={() =>
                                    history.push({
                                        pathname: "/product/buy",
                                        state: {
                                            name: "ユニフォーム " + url[i]
                                        }
                                    })
                                }
                            >
                                注文する
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            );
        }
        return <Fragment>{cardArr}</Fragment>;
    };

    return (
        <Container style={{ border: "solid black 1px" }}>
            <Row className="justify-content-center align-items-center">
                {productCard()}
            </Row>
        </Container>
    );
};

export default ProductHome;
