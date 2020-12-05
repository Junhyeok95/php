import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";

const ProductBuy = ({ match, history }) => {
    const getData = {
        name: "productData",
        data: [
            {
                name: "ユニフォーム A",
                price: 300
            },
            {
                name: "ユニフォーム B",
                price: 400
            },
            {
                name: "ユニフォーム C",
                price: 500
            },
            {
                name: "ユニフォーム D",
                price: 600
            },
            {
                name: "ユニフォーム E",
                price: 700
            }
        ]
    };
    const [productData, setProductData] = useState(getData.data[0]);

    useEffect(() => {
        console.log(productData);
    }, []);

    const cardData = () => {
        return (
            <Card style={{ minWidth: "10rem" }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>
                        <Card.Text style={{ fontSize: 32 }}>
                            {productData.name}
                        </Card.Text>
                        1 枚 {productData.price} 円 (税込)
                    </Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    };

    return (
        <Fragment>
            <Container>
                <Row>
                    <Col
                        className="justify-content-center p-4"
                        style={{ border: "solid black 1px" }}
                    >
                        {cardData()}
                    </Col>
                    <Col className="p-4">
                        <Form>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="name" />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="address"
                                />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Example select</Form.Label>
                                <Form.Control as="select">
                                    <option>ユニフォーム A</option>
                                    <option>ユニフォーム B</option>
                                    <option>ユニフォーム C</option>
                                    <option>ユニフォーム D</option>
                                    <option>ユニフォーム E</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput4">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="quantity"
                                />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>
                                    Example textarea (200文字)
                                </Form.Label>
                                <Form.Control as="textarea" rows={5} />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default ProductBuy;
