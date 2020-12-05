import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";

const ProductBuy = ({ match, history }) => {
    const sampleData = {
        name: "productData",
        data: [
            {
                name: "ユニフォーム A",
                price: 300,
                url: "/images/A.png"
            },
            {
                name: "ユニフォーム B",
                price: 400,
                url: "/images/B.png"
            },
            {
                name: "ユニフォーム C",
                price: 500,
                url: "/images/C.png"
            },
            {
                name: "ユニフォーム D",
                price: 600,
                url: "/images/D.png"
            },
            {
                name: "ユニフォーム E",
                price: 700,
                url: "/images/E.png"
            }
        ]
    };

    const [productData, setProductData] = useState(null);
    const [buyData, setBuyData] = useState({
        name: "",
        email: "",
        address: "",
        quantity: "1",
        message: ""
    });

    const selectSearch = e => {
        const select = e.target ? (e.target.value ? e.target.value : e) : e;
        const list = sampleData.data;

        for (let i = 0; i < list.length; i++) {
            if (list[i].name === select) {
                return setProductData(list[i]);
            }
        }
    };

    const formOnChange = e => {
        let _buyData = { ...buyData };
        _buyData[e.target.name] = e.target.value;
        setBuyData(_buyData);
        console.log(_buyData);
    };

    useEffect(() => {
        if (history.location.state && history.location.state.name) {
            selectSearch(history.location.state.name);
        } else {
            // defaultValue={"ユニフォーム E"}
            setProductData(sampleData.data[4]);
        }
    }, []);

    const cardData = () => {
        return (
            <Card
                className="h-100"
                style={{ padding: 10, border: "solid black 3px" }}
            >
                <Row className="justify-content-center">
                    <Card.Img
                        style={{ maxWidth: 300, maxHeight: 325 }}
                        variant="top"
                        src={productData.url}
                    />
                </Row>
                <Card.Body style={{ border: "solid black 1px" }}>
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

    const buyForm = () => {
        return (
            <Form style={{ padding: 10, border: "solid black 3px" }}>
                <Form.Group
                    style={{ border: "solid black 1px" }}
                    controlId="exampleForm.ControlInput1"
                >
                    <Form.Label>名前 : {buyData.name}</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        placeholder="name"
                        maxLength="32"
                        onChange={formOnChange}
                    />
                </Form.Group>
                <Form.Group
                    style={{ border: "solid black 1px" }}
                    controlId="exampleForm.ControlInput2"
                >
                    <Form.Label>メールアドレス : {buyData.email}</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        maxLength="48"
                        placeholder="name@example.com"
                        onChange={formOnChange}
                    />
                </Form.Group>
                <Form.Group
                    style={{ border: "solid black 1px" }}
                    controlId="exampleForm.ControlInput3"
                >
                    <Form.Label>住所 : {buyData.address}</Form.Label>
                    <Form.Control
                        name="address"
                        type="text"
                        maxLength="96"
                        placeholder="address"
                        onChange={formOnChange}
                    />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group
                            style={{ border: "solid black 1px" }}
                            controlId="exampleForm.ControlSelect1"
                        >
                            <Form.Label>商品の種類</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={selectSearch}
                                defaultValue={"ユニフォーム E"}
                            >
                                <option>ユニフォーム A</option>
                                <option>ユニフォーム B</option>
                                <option>ユニフォーム C</option>
                                <option>ユニフォーム D</option>
                                <option>ユニフォーム E</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group
                            style={{ border: "solid black 1px" }}
                            controlId="exampleForm.ControlInput4"
                        >
                            <Form.Label>
                                購入個数 : {buyData.quantity}
                            </Form.Label>
                            <Form.Control
                                name="quantity"
                                type="number"
                                max="99"
                                defaultValue={1}
                                onChange={e => {
                                    e.target.value = Math.max(
                                        0,
                                        parseInt(e.target.value)
                                    )
                                        .toString()
                                        .slice(0, 2);
                                    formOnChange(e);
                                }}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group
                    style={{ border: "solid black 1px" }}
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>備考欄 (200文字)</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="message"
                        maxLength="200"
                        onChange={formOnChange}
                        rows={5}
                    />
                </Form.Group>
                <Form.Group
                    controlId="exampleForm.Text"
                    style={{ border: "solid black 1px" }}
                >
                    <Form.Label>
                        billable_amount : {productData.price * buyData.quantity}
                    </Form.Label>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        );
    };

    return (
        <Fragment>
            <Container>
                {productData && (
                    <Row>
                        <Col className="p-3">{cardData()}</Col>
                        <Col className="p-3">{buyForm()}</Col>
                    </Row>
                )}
            </Container>
        </Fragment>
    );
};

export default ProductBuy;
