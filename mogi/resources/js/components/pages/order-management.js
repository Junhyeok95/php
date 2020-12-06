import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Table, Nav } from "react-bootstrap";

const OrderManagement = ({ match, history }) => {
    const sampleData = {
        name: "orderData",
        data: [
            {
                name: "orderDataHeadList",
                list: {
                    orderId: "No",
                    customerName: "氏名",
                    uniformKind: "種類",
                    uniformQuantity: "個数",
                    billableAmount: "合計金額",
                    createdAt: "発注日",
                    depositStatus: "入金状況",
                    shippingStatus: "発送状況"
                }
            },
            {
                name: "orderSample",
                list: [
                    {
                        orderId: "1",
                        customerName: "田中",
                        uniformKind: "ユニフォーム A",
                        uniformQuantity: "1",
                        billableAmount: "300",
                        createdAt: "2020年12月6日",
                        depositStatus: "入金待ち", // 入金済, 入金待ち
                        shippingStatus: "発送済" // 発送済, 発送準備中, 未
                    },
                    {
                        orderId: "2",
                        customerName: "山田",
                        uniformKind: "ユニフォーム A",
                        uniformQuantity: "1",
                        billableAmount: "300",
                        createdAt: "2020年12月6日",
                        depositStatus: "入金済", // 入金済, 入金待ち
                        shippingStatus: "発送準備中" // 発送済, 発送準備中, 未
                    },
                    {
                        orderId: "3",
                        customerName: "神田",
                        uniformKind: "ユニフォーム A",
                        uniformQuantity: "1",
                        billableAmount: "300",
                        createdAt: "2020年12月6日",
                        depositStatus: "入金済", // 入金済, 入金待ち
                        shippingStatus: "未" // 発送済, 発送準備中, 未
                    },
                    {
                        orderId: "4",
                        customerName: "田中",
                        uniformKind: "ユニフォーム A",
                        uniformQuantity: "1",
                        billableAmount: "300",
                        createdAt: "2020年12月6日",
                        depositStatus: "入金待ち", // 入金済, 入金待ち
                        shippingStatus: "発送済" // 発送済, 発送準備中, 未
                    },
                    {
                        orderId: "5",
                        customerName: "山田",
                        uniformKind: "ユニフォーム A",
                        uniformQuantity: "1",
                        billableAmount: "300",
                        createdAt: "2020年12月6日",
                        depositStatus: "入金済", // 入金済, 入金待ち
                        shippingStatus: "発送準備中" // 発送済, 発送準備中, 未
                    },
                    {
                        orderId: "6",
                        customerName: "神田",
                        uniformKind: "ユニフォーム A",
                        uniformQuantity: "1",
                        billableAmount: "300",
                        createdAt: "2020年12月6日",
                        depositStatus: "入金済", // 入金済, 入金待ち
                        shippingStatus: "未" // 発送済, 発送準備中, 未
                    }
                ]
            }
        ]
    };

    const [orderData, setOrderData] = useState(null);

    let [mediaFontSize, setMediaFontSize] = useState(
        (window.innerWidth || document.body.clientWidth) >= 768
            ? "16px"
            : "12px"
    );

    useEffect(() => {
        if (history.location.state && history.location.state.name) {
            console.log(orderData);
        } else {
            //
            setOrderData(sampleData.data[1].list);
        }

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
        const datalist = sampleData.data[0].list;
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
                    <td className="text-center">{orderData[i].orderId}</td>
                    <td className="text-center">{orderData[i].customerName}</td>
                    <td className="text-center">{orderData[i].uniformKind}</td>
                    <td className="text-right">
                        {orderData[i].uniformQuantity}
                    </td>
                    <td className="text-right">
                        ￥{orderData[i].billableAmount}
                    </td>
                    <td className="text-center">{orderData[i].createdAt}</td>
                    <td className="text-center">
                        {orderData[i].depositStatus}
                    </td>
                    <td className="text-center">
                        {orderData[i].shippingStatus}
                    </td>
                    <td className="text-center">詳細 / 更新</td>
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
        <Fragment>
            <Container>
                <Row className="pt-3">
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
        </Fragment>
    );
};

export default OrderManagement;
