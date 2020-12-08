import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import styled from "styled-components";
import Axios from "axios";
import moment from "moment";

const StyledSpan = styled.span`
    cursor: pointer;
    color: blue;
    &:hover {
        color: green;
    }
`;
const StyledSpanGreen = styled.span`
    cursor: pointer;
    color: green;
    &:hover {
        background-color: green;
        color: white;
    }
`;
const StyledSpanRed = styled.span`
    cursor: pointer;
    color: red;
    &:hover {
        background-color: red;
        color: white;
    }
`;

const OrderManagement = ({ history }) => {
    const [orderData, setOrderData] = useState(null);

    let [mediaFontSize, setMediaFontSize] = useState(
        (window.innerWidth || document.body.clientWidth) >= 768
            ? "16px"
            : "11px"
    );

    const [getProductName, setGetProductName] = useState(null);

    const getOrders = () => {
        Axios({
            method: "get",
            url: "/api/orders"
        })
            .then(res => {
                if (history.location.state && history.location.state.name) {
                    console.log("history.location.state.name");
                    console.log(history.location.state.name);
                    setOrderData(res.data[0]);
                } else {
                    console.log(res.data);
                    setOrderData(res.data[0]);
                }
                setGetProductName(res.data[1]);
            })
            .catch(error => console.log(error));
    };

    const detail = id => {
        const tr = document.getElementById("tr") + id;

        for (let i = 0; i < tr.childNodes.length; i++) {}
    };

    const edit = id => {
        const targetTr = document.getElementById(id);
        targetTr.childNodes[8].childNodes[0].style.display = "none";
        let editClone = document.getElementById("edit").cloneNode(true);
        console.log("edit");

        // 아직 남은거
        console.log(targetTr.childNodes[3]); // product_quantity
        console.log(targetTr.childNodes[4]); // billable_amount
        console.log(targetTr.childNodes[8]); // Button

        const autoSelected = (newEl, oldEl, num) => {
            for (
                let i = 0;
                i < newEl.childNodes[num].childNodes[0].length;
                i++
            ) {
                if (
                    oldEl.childNodes[num].textContent ===
                    newEl.childNodes[num].childNodes[0].childNodes[i]
                        .textContent
                ) {
                    newEl.childNodes[num].childNodes[0].childNodes[
                        i
                    ].selected = true;
                }
            }
        };
        editClone.childNodes[1].childNodes[0].placeholder =
            targetTr.childNodes[1].textContent;
        autoSelected(editClone, targetTr, 2);
        autoSelected(editClone, targetTr, 6);
        autoSelected(editClone, targetTr, 7);
        editClone.childNodes[4].textContent =
            targetTr.childNodes[4].textContent;
        editClone.childNodes[5].textContent =
            targetTr.childNodes[5].textContent;

        editClone.style.display = null; // 보이기
        targetTr.after(editClone);

        // AJAX -> targetTr.childNodes[0]
    };

    useEffect(() => {
        getOrders();

        const mql = window.matchMedia("screen and (max-width: 768px)");
        mql.addEventListener("change", e => {
            // "1.75vmin"
            if (e.matches) {
                setMediaFontSize("11px");
                // console.log("모바일 화면 입니다.");
            } else {
                setMediaFontSize("16px");
                // console.log("데스크탑 화면 입니다.");
            }
        });
    }, []);

    useEffect(() => {}, [mediaFontSize]);

    const monthlySales = () => {
        return (
            <Container>
                <Row>
                    <Col className="text-right" xs={{ span: 5, offset: 6 }}>
                        11月の売り上げ(発送完了分)
                    </Col>
                    <Col className="text-right" xs={{ span: 1 }}>
                        ￥8,000
                    </Col>
                </Row>
                <Row>
                    <Col className="text-right" xs={{ span: 5, offset: 6 }}>
                        10月の売り上げ(発送完了分)
                    </Col>
                    <Col className="text-right" xs={{ span: 1 }}>
                        ￥900
                    </Col>
                </Row>
            </Container>
        );
    };

    const orderListHead = () => {
        const datalist = {
            orderId: "No",
            customerName: "氏名",
            uniformKind: "種類",
            uniformQuantity: "個数",
            billableAmount: "合計金額",
            createdAt: "発注日",
            depositStatus: "入金状況",
            shippingStatus: "発送状況"
        };
        return (
            <thead
                style={{
                    fontSize: mediaFontSize,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}
            >
                <tr style={{ backgroundColor: "#dfefd8" }}>
                    <th style={{ width: "5%" }} className="text-center">
                        {datalist.orderId}
                    </th>
                    <th style={{ width: "10%" }} className="text-center">
                        {datalist.customerName}
                    </th>
                    <th style={{ width: "15%" }} className="text-center">
                        {datalist.uniformKind}
                    </th>
                    <th style={{ width: "7%" }} className="text-center">
                        {datalist.uniformQuantity}
                    </th>
                    <th style={{ width: "8%" }} className="text-center">
                        {datalist.billableAmount}
                    </th>
                    <th style={{ width: "15%" }} className="text-center">
                        {datalist.createdAt}
                    </th>
                    <th style={{ width: "10%" }} className="text-center">
                        {datalist.depositStatus}
                    </th>
                    <th style={{ width: "10%" }} className="text-center">
                        {datalist.shippingStatus}
                    </th>
                    <th style={{ width: "15%" }} className="text-center"></th>
                </tr>
            </thead>
        );
    };

    const option = () => {
        let optionArr = [];
        for (let i = 0; i < getProductName.length; i++) {
            optionArr.push(
                <option key={"option" + i}>{getProductName[i].name}</option>
            );
        }
        return optionArr;
    };

    const orderListBody = () => {
        let bodyArr = [];

        for (let i = 0; i < orderData.length; i++) {
            bodyArr.push(
                <tr
                    id={"tr" + orderData[i].id}
                    style={{
                        fontSize: mediaFontSize
                    }}
                    key={"bodyArr" + i}
                >
                    <td className="text-center">
                        {orderData[i].id ? orderData[i].id : "X"}
                    </td>
                    <td className="text-center">
                        {orderData[i].name ? orderData[i].name : "X"}
                    </td>
                    <td className="text-center">
                        {orderData[i].product_name
                            ? orderData[i].product_name
                            : "X"}
                    </td>
                    <td className="text-right">
                        {orderData[i].quantity ? orderData[i].quantity : "X"}
                    </td>
                    <td className="text-right">
                        ￥
                        {orderData[i].billable_amount
                            ? orderData[i].billable_amount
                            : "X"}
                    </td>
                    <td className="text-center">
                        {moment(orderData[i].created_at).format(
                            "YYYY年MM月DD日"
                        )
                            ? moment(orderData[i].created_at).format(
                                  "YYYY年MM月DD日"
                              )
                            : "X"}
                    </td>
                    <td className="text-center">
                        {orderData[i].deposit_status
                            ? orderData[i].deposit_status
                            : "X"}
                    </td>
                    <td className="text-center">
                        {orderData[i].shipping_status
                            ? orderData[i].shipping_status
                            : "X"}
                    </td>
                    <td className="text-center">
                        <span>
                            <StyledSpan
                                className="pr-1 pl-1 m-0"
                                onClick={() => {
                                    history.push({
                                        pathname: "/order/" + 1,
                                        state: {
                                            name: ""
                                        }
                                    });
                                }}
                            >
                                詳細
                            </StyledSpan>
                            {" / "}
                            <StyledSpan
                                className="pr-1 pl-1 m-0"
                                onClick={e => {
                                    edit(
                                        e.target.parentNode.parentNode
                                            .parentNode.id
                                    );
                                }}
                            >
                                更新
                            </StyledSpan>
                        </span>
                    </td>
                </tr>
            );
        }
        bodyArr.push(
            <tr
                id={"edit"}
                key={"bodyArrUpdate"}
                style={{
                    display: "none",
                    fontSize: mediaFontSize
                }}
            >
                <td style={{ color: "green" }} className="text-center">
                    ↳
                </td>
                <td className="text-center">
                    <Form.Control
                        name="name"
                        type="text"
                        placeholder="name"
                        maxLength="32"
                        size="sm"
                    />
                </td>
                <td className="text-center">
                    <Form.Control as="select" size="sm">
                        {option()}
                    </Form.Control>
                </td>
                <td className="text-right">
                    <Form.Control
                        name="quantity"
                        type="number"
                        max="99"
                        defaultValue={1}
                        size="sm"
                    />
                </td>
                <td className="text-right">￥ 가격</td>
                <td className="text-center">주문일</td>
                <td className="text-center">
                    <Form.Control as="select" size="sm">
                        <option>入金待ち</option>
                        <option>入金済</option>
                    </Form.Control>
                </td>
                <td className="text-center">
                    <Form.Control as="select" size="sm">
                        <option>未</option>
                        <option>発送準備中</option>
                        <option>発送済</option>
                    </Form.Control>
                </td>
                <td className="text-center">
                    <span>
                        <StyledSpanGreen className="pr-1 pl-1 m-0">
                            修整
                        </StyledSpanGreen>
                        {" / "}
                        <StyledSpanRed className="pr-1 pl-1 m-0">
                            削除
                        </StyledSpanRed>
                    </span>
                </td>
            </tr>
        );

        return (
            <tbody
                style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}
            >
                {bodyArr}
            </tbody>
        );
    };

    const orderList = () => {
        return (
            <Row>
                <Row>
                    <Col>受注管理一覧</Col>
                </Row>
                <Table // striped bordered
                    hover
                    bordered
                    size="sm"
                >
                    {orderListHead()}
                    {orderListBody()}
                </Table>
            </Row>
        );
    };

    return (
        <Container className="p-3" style={{ border: "solid black 1px" }}>
            <Row>
                <h1
                    style={{
                        width: "100%",
                        textAlign: "center",
                        borderBottom: "solid blue 2px"
                    }}
                >
                    受注管理システム
                </h1>
            </Row>
            {orderData && getProductName && (
                <Fragment>
                    {monthlySales()}
                    {orderList()}
                </Fragment>
            )}
        </Container>
    );
};

export default OrderManagement;
