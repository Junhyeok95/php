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
        (window.innerWidth || document.body.clientWidth) <= 992
            ? (window.innerWidth || document.body.clientWidth) <= 768
                ? "10px"
                : "13px"
            : "16px"
    );

    const [getProductList, setGetProductList] = useState(null);
    const [getMonthlySalesList, setGetMonthlySalesList] = useState(null);

    const AddComma = data_value => {
        return "￥ " + Number(data_value).toLocaleString("en");
    };

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
                        setGetMonthlySalesList(res.data[2]);
                    }
                })
                .catch(err => {
                    history.push("/");
                    console.log(err);
                });
        } catch (err) {
            history.push("/");
            localStorage.removeItem("user");
            alert("로그인을 다시 해주세요");
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
                .then(res => {})
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
                            oldEl.style.borderTop = "solid 3px green";
                            oldEl.childNodes[8].childNodes[0].style.display =
                                "none";
                            oldEl.childNodes[8].childNodes[1].style.display =
                                "none";
                            oldEl.childNodes[8].childNodes[2].style.display =
                                "none";
                            oldEl.childNodes[8].childNodes[3].style.display =
                                "unset";

                            oldEl.childNodes[8].childNodes[3].addEventListener(
                                "click",
                                () => {
                                    newEl.remove();
                                    oldEl.style.border = "";
                                    oldEl.childNodes[8].childNodes[3].style.display =
                                        "none";
                                    oldEl.childNodes[8].childNodes[0].style.display =
                                        "unset";
                                    oldEl.childNodes[8].childNodes[1].style.display =
                                        "unset";
                                    oldEl.childNodes[8].childNodes[2].style.display =
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
                                            newEl.childNodes[4].textContent = AddComma(
                                                result
                                            );
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
                        editClone.childNodes[8].children[0].addEventListener(
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
                                    },
                                    data: {
                                        type: "edit_update",
                                        name:
                                            editClone.childNodes[1]
                                                .childNodes[0].value,
                                        product_name:
                                            editClone.childNodes[2]
                                                .childNodes[0].value,
                                        quantity:
                                            editClone.childNodes[3]
                                                .childNodes[0].value,
                                        deposit_status:
                                            editClone.childNodes[6]
                                                .childNodes[0].value,
                                        shipping_status:
                                            editClone.childNodes[7]
                                                .childNodes[0].value
                                    }
                                })
                                    .then(res => {
                                        if (res.data) {
                                            alert("保存完了");
                                            editClone.remove();
                                            editOld.style.border = "";
                                            editOld.childNodes[8].childNodes[3].style.display =
                                                "none";
                                            editOld.childNodes[8].childNodes[0].style.display =
                                                "unset";
                                            editOld.childNodes[8].childNodes[1].style.display =
                                                "unset";
                                            editOld.childNodes[8].childNodes[2].style.display =
                                                "unset";
                                            getOrders();
                                        }
                                    })
                                    .catch(err => console.log(err));
                            },
                            false
                        );
                        editClone.childNodes[8].children[1].addEventListener(
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
                                            editOld.childNodes[8].childNodes[3].style.display =
                                                "none";
                                            editOld.childNodes[8].childNodes[0].style.display =
                                                "unset";
                                            editOld.childNodes[8].childNodes[1].style.display =
                                                "unset";
                                            editOld.childNodes[8].childNodes[2].style.display =
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

        const mql = window.matchMedia("screen and (max-width: 992px)");
        mql.addEventListener("change", e => {
            if (e.matches) {
                setMediaFontSize("13px");
            } else {
                setMediaFontSize("16px");
            }
        });
        const mql2 = window.matchMedia("screen and (max-width: 768px)");
        mql2.addEventListener("change", e => {
            if (e.matches) {
                setMediaFontSize("10px");
            } else {
                setMediaFontSize("13px");
            }
        });
    }, []);

    useEffect(() => {}, [mediaFontSize]);

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
                    whiteSpace: "nowrap"
                }}
            >
                <tr style={{ backgroundColor: "#dfefd8" }}>
                    <th style={{ width: "5%" }} className="text-center">
                        {datalist.orderId}
                    </th>
                    <th style={{ width: "14%" }} className="text-center">
                        {datalist.customerName}
                    </th>
                    <th style={{ width: "15%" }} className="text-center">
                        {datalist.uniformKind}
                    </th>
                    <th style={{ width: "8%" }} className="text-center">
                        {datalist.uniformQuantity}
                    </th>
                    <th style={{ width: "8%" }} className="text-center">
                        {datalist.billableAmount}
                    </th>
                    <th style={{ width: "18%" }} className="text-center">
                        {datalist.createdAt}
                    </th>
                    <th style={{ width: "10%" }} className="text-center">
                        {datalist.depositStatus}
                    </th>
                    <th style={{ width: "10%" }} className="text-center">
                        {datalist.shippingStatus}
                    </th>
                    <th style={{ width: "12%" }} className="text-center"></th>
                </tr>
            </thead>
        );
    };

    const monthlySales = () => {
        let salesArr = [];
        for (let i = 0; i < getMonthlySalesList.length; i++) {
            salesArr.push(
                <Row
                    style={{
                        fontSize: mediaFontSize
                    }}
                    key={"sales" + i}
                    className="p-0"
                >
                    <Col className="text-right" xs={{ span: 6, offset: 4 }}>
                        {getMonthlySalesList[i].key}の売り上げ(発送完了分)
                    </Col>
                    <Col className="text-right pr-3" xs={2}>
                        {AddComma(getMonthlySalesList[i].value)}
                    </Col>
                </Row>
            );
        }
        return <Fragment>{salesArr}</Fragment>;
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
                <Fragment key={"bodyArr" + i}>
                    <tr id={"tr" + orderData[i].id}>
                        <td className="text-center">
                            {orderData[i].id ? orderData[i].id : "X"}
                        </td>
                        <td
                            className="text-center"
                            style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {orderData[i].name ? orderData[i].name : "X"}
                        </td>
                        <td
                            className="text-center"
                            style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {orderData[i].product_name
                                ? orderData[i].product_name
                                : "X"}
                        </td>
                        <td className="text-right">
                            {orderData[i].quantity
                                ? orderData[i].quantity
                                : "X"}
                        </td>
                        <td
                            className="text-right"
                            style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {orderData[i].billable_amount
                                ? AddComma(orderData[i].billable_amount)
                                : "X"}
                        </td>
                        <td
                            className="text-center"
                            style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {moment(orderData[i].created_at).format(
                                "YYYY年MM月DD日 HH:mm"
                            )
                                ? mediaFontSize == "10px"
                                    ? moment(orderData[i].created_at).format(
                                          "MM月DD日 HH:mm"
                                      )
                                    : moment(orderData[i].created_at).format(
                                          "YY年MM月DD日 HH:mm"
                                      )
                                : "X"}
                        </td>
                        <td
                            className="text-center"
                            style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {orderData[i].deposit_status
                                ? orderData[i].deposit_status
                                : "X"}
                        </td>
                        <td
                            className="text-center"
                            style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {orderData[i].shipping_status
                                ? orderData[i].shipping_status
                                : "X"}
                        </td>
                        <td
                            className="text-center"
                            style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            <StyledSpan
                                data-toggle="collapse"
                                data-target={["#accordion" + i]}
                                className="pr-1 pl-1 m-0"
                                // onClick={e => {
                                //     show(
                                //         e.target.parentNode.parentNode
                                //             .parentNode.id
                                //     );
                                // }}
                            >
                                詳細
                            </StyledSpan>
                            <span>{"/"}</span>
                            <StyledSpan
                                className="pr-1 pl-1 m-0"
                                onClick={e => {
                                    edit(e.target.parentNode.parentNode.id);
                                }}
                            >
                                更新
                            </StyledSpan>
                            <StyledSpanCancel className="pr-1 pl-1 m-0">
                                キャンセル
                            </StyledSpanCancel>
                        </td>
                    </tr>
                    <tr
                        style={{
                            borderBottom: "solid 3px black"
                        }}
                        id={"accordion" + i}
                        className="collapse text-center"
                    >
                        <th
                            style={{
                                color: "red",
                                height: 72
                            }}
                            className="p-0 align-middle"
                        >
                            ↳
                        </th>
                        <th
                            style={{ height: "100%" }}
                            className="p-0 align-middle"
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    backgroundColor: "#dfefd8",
                                    height: "32px"
                                }}
                            >
                                メール
                            </div>
                        </th>
                        <td
                            colSpan="2"
                            className="align-middle"
                            style={{
                                whiteSpace: "normal",
                                wordBreak: "break-all"
                            }}
                        >
                            {orderData[i].email}
                        </td>
                        <th
                            style={{ height: "100%" }}
                            className="p-0 align-middle"
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    backgroundColor: "#dfefd8",
                                    height: "32px",
                                    width: "100%"
                                }}
                            >
                                住所
                            </div>
                        </th>
                        <td
                            className="align-middle"
                            style={{
                                whiteSpace: "normal",
                                wordBreak: "break-all"
                            }}
                        >
                            {orderData[i].address}
                        </td>
                        <td className="p-0" colSpan="2">
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#dfefd8",
                                    height: 32
                                }}
                            >
                                備考欄
                            </div>
                            <div
                                style={{
                                    whiteSpace: "normal",
                                    wordBreak: "break-all"
                                }}
                            >
                                {orderData[i].message}
                            </div>
                        </td>
                        <td
                            className="p-0 align-middle"
                            colSpan="1"
                            data-toggle="collapse"
                            data-target={"#accordion" + i}
                        >
                            <div
                                style={{
                                    cursor: "pointer"
                                }}
                            >
                                <strong style={{ color: "red" }}>↳</strong>
                                キャンセル
                            </div>
                        </td>
                    </tr>
                </Fragment>
            );
        }
        bodyArr.push(
            <tr
                id={"edit"}
                key={"bodyArrUpdate"}
                style={{
                    display: "none",
                    borderBottom: "solid 3px green"
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
                <td className="text-right align-middle">billableAmount</td>
                <td className="text-center align-middle">createdAt</td>
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
                <td className="text-center align-middle">
                    <StyledSpanGreen className="pr-1 pl-1 m-0">
                        保存
                    </StyledSpanGreen>
                    {"/"}
                    <StyledSpanRed className="pr-1 pl-1 m-0">
                        削除
                    </StyledSpanRed>
                </td>
            </tr>
        );

        return (
            <tbody
                style={{
                    fontSize: mediaFontSize,
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
                    className="p-0 m-0"
                    style={{ tableLayout: "fixed" }}
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
                    {getMonthlySalesList && monthlySales()}
                    {orderList()}
                </Fragment>
            )}
        </Container>
    );
};

export default OrderManagement;
