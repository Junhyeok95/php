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
const StyledSpanCancel = styled.span`
    cursor: pointer;
    color: blue;
    display: none;
    &:hover {
        background-color: blue;
        color: white;
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

    const [getProductList, setGetProductList] = useState(null);

    const getOrders = () => {
        try {
            Axios({
                method: "get",
                url: "/api/orders",
                headers: {
                    Authorization:
                        "Bearer " +
                        JSON.parse(localStorage.getItem("user")).token
                }
            })
                .then(res => {
                    if (res.data) {
                        setOrderData(res.data[0]);
                        setGetProductList(res.data[1]);
                    }
                })
                .catch(err => {
                    history.push("/");
                    console.log(err);
                });
        } catch (err) {
            history.push("/");
            console.log(err);
        }
    };

    const show = id => {
        try {
            Axios({
                method: "get",
                url: `/api/orders/${id.substr(2)}`,
                headers: {
                    Authorization:
                        "Bearer " +
                        JSON.parse(localStorage.getItem("user")).token
                }
            })
                .then(res => {
                    console.log(res);
                    if (res.data) {
                    }
                })
                .catch(err => console.log(err));
        } catch (err) {
            history.push("/");
            console.log(err);
        }
    };

    const edit = id => {
        try {
            Axios({
                method: "get",
                url: `/api/orders/${id.substr(2)}`,
                headers: {
                    Authorization:
                        "Bearer " +
                        JSON.parse(localStorage.getItem("user")).token
                }
            })
                .then(res => {
                    if (res.data) {
                        const editDisplay = (newEl, oldEl) => {
                            oldEl.style.border = "solid 3px green";
                            oldEl.style.borderBottom = "";
                            oldEl.childNodes[8].childNodes[0].childNodes[0].style.display =
                                "none";
                            oldEl.childNodes[8].childNodes[0].childNodes[1].style.display =
                                "none";
                            oldEl.childNodes[8].childNodes[0].childNodes[2].style.display =
                                "none";
                            oldEl.childNodes[8].childNodes[0].childNodes[3].style.display =
                                "unset";

                            oldEl.childNodes[8].childNodes[0].childNodes[3].addEventListener(
                                "click",
                                () => {
                                    newEl.remove();
                                    oldEl.style.border = "";
                                    oldEl.childNodes[8].childNodes[0].childNodes[3].style.display =
                                        "none";
                                    oldEl.childNodes[8].childNodes[0].childNodes[0].style.display =
                                        "unset";
                                    oldEl.childNodes[8].childNodes[0].childNodes[1].style.display =
                                        "unset";
                                    oldEl.childNodes[8].childNodes[0].childNodes[2].style.display =
                                        "unset";
                                },
                                false
                            );
                        };
                        const autoSelected = (newEl, oldEl, num) => {
                            for (
                                let i = 0;
                                i < newEl.childNodes[num].childNodes[0].length;
                                i++
                            ) {
                                if (
                                    oldEl.childNodes[num].textContent ===
                                    newEl.childNodes[num].childNodes[0]
                                        .childNodes[i].textContent
                                ) {
                                    newEl.childNodes[
                                        num
                                    ].childNodes[0].childNodes[
                                        i
                                    ].selected = true;
                                }
                            }
                        };
                        const calculation = (newEl, list, quantity) => {
                            for (
                                let i = 0;
                                i < newEl.childNodes[2].childNodes[0].length;
                                i++
                            ) {
                                if (
                                    newEl.childNodes[2].childNodes[0]
                                        .childNodes[i].selected
                                ) {
                                    const selectedName =
                                        newEl.childNodes[2].childNodes[0]
                                            .childNodes[i].value;
                                    for (let j = 0; j < list.length; j++) {
                                        if (list[j].name === selectedName) {
                                            const result =
                                                list[j].price * quantity;
                                            newEl.childNodes[4].textContent =
                                                "￥" + result;
                                            return;
                                        }
                                    }
                                }
                            }
                        };

                        const editOld = document.getElementById(id);
                        const editClone = document
                            .getElementById("edit")
                            .cloneNode(true);
                        editDisplay(editClone, editOld); // new, old

                        // 1. 이름
                        editClone.childNodes[1].childNodes[0].placeholder =
                            editOld.childNodes[1].textContent;
                        editClone.childNodes[1].childNodes[0].value =
                            editOld.childNodes[1].textContent;
                        // editClone.childNodes[1].childNodes[0].addEventListener("input", e => {
                        //     console.log(e.target.value);
                        // });

                        // 2. 제품
                        autoSelected(editClone, editOld, 2);
                        editClone.childNodes[2].childNodes[0].addEventListener(
                            "change",
                            e => {
                                calculation(
                                    editClone,
                                    getProductList,
                                    editClone.childNodes[3].childNodes[0].value
                                );
                            }
                        );

                        // 3. 입력 클릭
                        editClone.childNodes[3].childNodes[0].value =
                            editOld.childNodes[3].textContent;
                        editClone.childNodes[3].childNodes[0].addEventListener(
                            "input",
                            e => {
                                if (
                                    parseInt(e.target.value) &&
                                    parseInt(e.target.value) > 0
                                ) {
                                    calculation(
                                        editClone,
                                        getProductList,
                                        e.target.value
                                    );
                                } else {
                                    // alert("数字のみ入力可能です。");
                                    e.target.value = 1;
                                    calculation(editClone, getProductList, 1);
                                }
                            }
                        );
                        // editClone.childNodes[3].childNodes[0].addEventListener("change", e => {
                        //     console.log("체인지");
                        // });

                        // 4. 가격
                        editClone.childNodes[4].textContent =
                            editOld.childNodes[4].textContent;

                        // 5. 주문일은 그대로
                        editClone.childNodes[5].textContent =
                            editOld.childNodes[5].textContent;

                        // 6. 입금 선택값
                        autoSelected(editClone, editOld, 6);

                        // 7. 배송 선택값
                        autoSelected(editClone, editOld, 7);

                        // 8. 저장, 삭제 이벤트
                        editClone.childNodes[8].childNodes[0].children[0].addEventListener(
                            "click",
                            () => {
                                Axios({
                                    method: "put",
                                    url: `/api/orders/${id.substr(2)}`,
                                    headers: {
                                        Authorization:
                                            "Bearer " +
                                            JSON.parse(
                                                localStorage.getItem("user")
                                            ).token
                                    }
                                })
                                    .then(res => {
                                        if (res.data) {
                                            console.log(res.data);
                                            getOrders();
                                        }
                                    })
                                    .catch(err => console.log(err));
                            },
                            false
                        );
                        editClone.childNodes[8].childNodes[0].children[1].addEventListener(
                            "click",
                            () => {
                                Axios({
                                    method: "delete",
                                    url: `/api/orders/${id.substr(2)}`,
                                    headers: {
                                        Authorization:
                                            "Bearer " +
                                            JSON.parse(
                                                localStorage.getItem("user")
                                            ).token
                                    }
                                })
                                    .then(res => {
                                        if (res.data) {
                                            alert("削除　完了");
                                            editClone.remove();
                                            editOld.style.border = "";
                                            editOld.childNodes[8].childNodes[0].childNodes[3].style.display =
                                                "none";
                                            editOld.childNodes[8].childNodes[0].childNodes[0].style.display =
                                                "unset";
                                            editOld.childNodes[8].childNodes[0].childNodes[1].style.display =
                                                "unset";
                                            editOld.childNodes[8].childNodes[0].childNodes[2].style.display =
                                                "unset";
                                            getOrders();
                                        }
                                    })
                                    .catch(err => console.log(err));
                            },
                            false
                        );

                        // 0. 폼 보이기, 추가
                        editClone.style.display = null;
                        editOld.after(editClone);
                    }
                })
                .catch(err => console.log(err));
        } catch (err) {
            history.push("/");
            console.log(err);
        }
    };

    useEffect(() => {
        getOrders();

        const mql = window.matchMedia("screen and (max-width: 768px)");
        mql.addEventListener("change", e => {
            // "1.75vmin"
            if (e.matches) {
                setMediaFontSize("8px");
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
        for (let i = 0; i < getProductList.length; i++) {
            optionArr.push(
                <option key={"option" + i}>{getProductList[i].name}</option>
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
                                onClick={e => {
                                    show(
                                        e.target.parentNode.parentNode
                                            .parentNode.id
                                    );
                                }}
                            >
                                詳細
                            </StyledSpan>
                            <span>{" / "}</span>
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
                            <StyledSpanCancel
                                className="pr-1 pl-1 m-0"
                                onClick={e => {}}
                            >
                                キャンセル
                            </StyledSpanCancel>
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
                    fontSize: mediaFontSize,
                    border: "solid 3px green",
                    borderTop: ""
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
                <td className="text-right">billableAmount</td>
                <td className="text-center">createdAt</td>
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
                            保存
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
            {orderData && getProductList && (
                <Fragment>
                    {monthlySales()}
                    {orderList()}
                </Fragment>
            )}
        </Container>
    );
};

export default OrderManagement;
