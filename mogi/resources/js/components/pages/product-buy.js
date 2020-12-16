import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import Axios from "axios";

const ProductBuy = ({ history }) => {
    const [getData, setGetData] = useState(null);
    const [productData, setProductData] = useState(null);
    const [buyData, setBuyData] = useState({
        name: "name",
        email: "email",
        address: "address",
        quantity: "1",
        message: "message"
    });

    const selectSearch = e => {
        const select = e.target ? (e.target.value ? e.target.value : e) : e;
        const list = getData;
        for (let i = 0; i < list.length; i++) {
            if (list[i].name === select) {
                setProductData(list[i]);
            }
        }
    };

    const formOnChange = e => {
        let _buyData = { ...buyData };
        _buyData[e.target.name] = e.target.value;
        setBuyData(_buyData);
    };

    const AddComma = data_value => {
        return "￥ " + Number(data_value).toLocaleString("en");
    };

    const getProducts = () => {
        Axios({
            method: "get",
            url: "/api/products"
        })
            .then(res => {
                if (history.location.state && history.location.state.name) {
                    setGetData(res.data);
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].name === history.location.state.name) {
                            setProductData(res.data[i]);
                        }
                    }
                } else {
                    setGetData(res.data);
                    setProductData(res.data[res.data.length - 1]); //
                }
            })
            .catch(err => console.log(err));
    };

    const axiosSubmit = e => {
        e.preventDefault();
        Axios({
            method: "post",
            url: "/api/orders",
            data: {
                name: buyData.name ? buyData.name : "name",
                email: buyData.email ? buyData.email : "email@example.com",
                address: buyData.address ? buyData.address : "address",
                quantity: buyData.quantity,
                message: buyData.message,
                product_id: productData.id,
                billable_amount: productData.price * buyData.quantity
            }
        })
            .then(res => {
                if (res.data) {
                    const { name, email } = res.data;
                    alert(
                        `注文完了\n\n名前：${name}\nメールアドレス：${email}`
                    );
                    history.push("/product");
                }
            })
            .catch(err => {
                alert("正しいメールアドレスを入力してください。");
            });
    };

    useEffect(() => {
        getProducts();
    }, []);

    const cardData = () => {
        return (
            <Col className="d-flex h-100 justify-content-center align-items-center">
                <Row>
                    <Card className="p-5">
                        <Card.Img
                            style={{ maxWidth: 240, maxHeight: 260 }}
                            variant="top"
                            src={productData.url}
                        />
                        <Card.Body>
                            <Card.Title style={{ textAlign: "center" }}>
                                <Card.Text
                                    style={{ fontSize: 20, fontWeight: 900 }}
                                >
                                    {productData.name}
                                </Card.Text>
                                <Card.Text style={{ fontSize: 16 }}>
                                    1 枚 {productData.price} 円 (税込)
                                </Card.Text>
                            </Card.Title>
                            <Card.Text></Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Col>
        );
    };

    const option = () => {
        let optionArr = [];
        for (let i = 0; i < getData.length; i++) {
            optionArr.push(
                <option key={"option" + i}>{getData[i].name}</option>
            );
        }
        return optionArr;
    };

    const buyForm = () => {
        return (
            <Row className="align-content-center h-100 m-1">
                <Col>
                    <h1
                        style={{
                            width: "100%",
                            textAlign: "center",
                            borderBottom: "solid green 2px"
                        }}
                    >
                        注文画面
                    </h1>
                    <Form className="mt-3">
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>名前</Form.Label>
                            <Form.Control
                                name="name"
                                type="text"
                                placeholder="name"
                                maxLength="32"
                                onChange={formOnChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>メールアドレス</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                maxLength="48"
                                placeholder="name@example.com"
                                onChange={formOnChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput3">
                            <Form.Label>住所</Form.Label>
                            <Form.Control
                                name="address"
                                type="text"
                                maxLength="96"
                                placeholder="address"
                                onChange={formOnChange}
                            />
                        </Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>商品の種類</Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange={selectSearch}
                                        defaultValue={productData.name}
                                    >
                                        {option()}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlInput4">
                                    <Form.Label>購入個数</Form.Label>
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
                                                .slice(0, 3);
                                            formOnChange(e);
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>備考欄 (200文字)</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="message"
                                maxLength="200"
                                onChange={formOnChange}
                                rows={5}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.Text">
                            <Form.Label
                                style={{
                                    fontSize: 20,
                                    fontWeight: 900,
                                    textAlign: "center",
                                    width: "100%"
                                }}
                                name="billable_amount"
                            >
                                {"決済金額：　"}
                                {AddComma(productData.price * buyData.quantity)}
                                {"円　(税込)"}
                            </Form.Label>
                            <Row className="justify-content-center">
                                <Button
                                    variant="outline-success"
                                    size="lg"
                                    onClick={axiosSubmit}
                                >
                                    注文を確定する
                                </Button>
                            </Row>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        );
    };

    return (
        <Container style={{ border: "solid black 1px" }}>
            {productData && (
                <Row>
                    <Col className="p-1">{cardData()}</Col>
                    <Col className="p-1">{buyForm()}</Col>
                </Row>
            )}
        </Container>
    );
};

export default ProductBuy;
