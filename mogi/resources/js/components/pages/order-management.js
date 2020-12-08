import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import styled from "styled-components";
import Axios from "axios";
import moment from "moment";

const StyledSpan = styled.span`
    cursor: pointer;
    color: blue;
    &:hover {
        color: #ff0000;
    }
`;

const OrderManagement = ({ history }) => {
    const [orderData, setOrderData] = useState(null);

    let [mediaFontSize, setMediaFontSize] = useState(
        (window.innerWidth || document.body.clientWidth) >= 768
            ? "16px"
            : "12px"
    );

    const getOrders = () => {
        Axios({
            method: "get",
            url: "/api/orders"
        })
            .then(res => {
                if (history.location.state && history.location.state.name) {
                    console.log(orderData);
                } else {
                    console.log(res.data);
                    setOrderData(res.data);
                }
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        getOrders();

        const mql = window.matchMedia("screen and (max-width: 768px)");
        mql.addEventListener("change", e => {
            // "1.75vmin"
            if (e.matches) {
                setMediaFontSize("12px");
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
            <thead style={{ fontSize: mediaFontSize }}>
                <tr style={{ backgroundColor: "#dfefd8" }}>
                    <th className="text-center">{datalist.orderId}</th>
                    <th className="text-center">{datalist.customerName}</th>
                    <th className="text-center">{datalist.uniformKind}</th>
                    <th className="text-center">{datalist.uniformQuantity}</th>
                    <th className="text-center">{datalist.billableAmount}</th>
                    <th className="text-center">{datalist.createdAt}</th>
                    <th className="text-center">{datalist.depositStatus}</th>
                    <th className="text-center">{datalist.shippingStatus}</th>
                    <th className="text-center"></th>
                </tr>
            </thead>
        );
    };

    const orderListBody = () => {
        let bodyArr = [];

        for (let i = 0; i < orderData.length; i++) {
            bodyArr.push(
                <tr style={{ fontSize: mediaFontSize }} key={"bodyArr" + i}>
                    <td className="text-center">{orderData[i].id}</td>
                    <td className="text-center">{orderData[i].name}</td>
                    <td className="text-center">{orderData[i].product_name}</td>
                    <td className="text-right">{orderData[i].quantity}</td>
                    <td className="text-right">
                        ￥{orderData[i].billable_amount}
                    </td>
                    <td className="text-center">
                        {moment(orderData[i].created_at).format(
                            "YYYY年MM月DD日"
                        )}
                    </td>
                    <td className="text-center">
                        {orderData[i].deposit_status}
                    </td>
                    <td className="text-center">
                        {orderData[i].shipping_status}
                    </td>
                    <td className="text-center">
                        <StyledSpan
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
                            onClick={() => {
                                history.push({
                                    pathname: "/order/" + 1 + "edit",
                                    state: {
                                        name: ""
                                    }
                                });
                            }}
                        >
                            更新
                        </StyledSpan>
                    </td>
                </tr>
            );
        }

        return <tbody>{bodyArr}</tbody>;
    };

    const orderList = () => {
        return (
            <Row>
                <Row>
                    <Col>受注管理一覧</Col>
                </Row>
                <Table // striped bordered
                    hover
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
            {orderData && (
                <Fragment>
                    {monthlySales()}
                    {orderList()}
                </Fragment>
            )}
        </Container>
    );
};

export default OrderManagement;
