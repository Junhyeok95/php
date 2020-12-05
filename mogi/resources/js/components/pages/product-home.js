import { param } from "jquery";
import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const ProductHome = ({ match, history }) => {
    const productCard = () => {
        const url = ["A", "B", "C", "D", "E"];
        let cardArr = [];

        for (let i = 0; i < 5; i++) {
            cardArr.push(
                <Col className="justify-content-center" key={"productCard" + i}>
                    <Card style={{ minWidth: "10rem" }}>
                        <Card.Img
                            style={{ maxWidth: 300, maxHeight: 325 }}
                            variant="top"
                            src={`/images/${url[i]}.png`}
                        />
                        <Card.Body className="w-auto">
                            <Card.Title style={{ textAlign: "center" }}>
                                Card Title
                            </Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                            <Button
                                variant="primary"
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
                                購入
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            );
        }
        return <Fragment>{cardArr}</Fragment>;
    };

    return (
        <Fragment>
            ProductHome
            <Container>
                <Row>{productCard()}</Row>
            </Container>
        </Fragment>
    );
};

export default ProductHome;
