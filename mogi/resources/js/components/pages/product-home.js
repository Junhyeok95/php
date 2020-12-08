import React, { Fragment } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const ProductHome = ({ history }) => {
    const productCard = () => {
        const url = ["A", "B", "C", "D", "E"];
        let cardArr = [];

        for (let i = 0; i < 5; i++) {
            cardArr.push(
                <Col key={"productCard" + i}>
                    <Card className="justify-content-center align-items-center p-1 pt-3 mb-3">
                        <Card.Img
                            style={{
                                minWidth: "10rem",
                                maxWidth: "15rem"
                            }}
                            variant="top"
                            src={`/images/${url[i]}.png`}
                        />
                        <Card.Body className="w-auto">
                            <Card.Title>{"ユニフォーム " + url[i]}</Card.Title>
                            <Card.Text></Card.Text>
                            <Button
                                variant="success"
                                className="w-100"
                                onClick={() =>
                                    history.push({
                                        pathname: "/product/create",
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
        <Container className="p-3" style={{ border: "solid black 1px" }}>
            <Row>{productCard()}</Row>
        </Container>
    );
};

export default ProductHome;
