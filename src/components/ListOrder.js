import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import '../assests/css/ListOrder.css';
import { getAll } from '../services/OrderService';

function ListOrder() {
    //States:
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [orderList, setOrderList] = useState([]);


    //Effects:
    useEffect(() => {
        getListOrder()
    }, [orderList])


    //Methods:
    const getListOrder = async () => {
        const newOrderList = await getAll();
        const sortByPrice = (a, b) => {
            return a.product.price - b.product.price;
        };
        newOrderList.sort(sortByPrice);
        setOrderList(newOrderList);
    }

    const converDate = (date) => {
        let newDate = date.split("-");
        let convertedDate = `${newDate[2]}/${newDate[1]}/${newDate[0]}`
        return convertedDate;
    }

    const submitHandler = () => {

    }





    return (
        <>
            <div className="container">
                <h2>Thống kê đơn hàng</h2>
                <Formik enableReinitialize initialValues={{}} onSubmit={submitHandler}>
                    <Form>
                        <label htmlFor="fDateInput" className="lable-input">Danh sách từ:</label>
                        <Field name="fdate" type="date" id="fDateInput" />
                        <label htmlFor="tDateInput" className="lable-input">đến:</label>
                        <Field name="tdate" type="date" id="tDateInput" />
                        <button type="submit">Xem</button>
                    </Form>
                </Formik>

                <div className="orderList-container">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã đơn hàng</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá (USD)</th>
                                <th>Loại sản phẩm</th>
                                <th>Ngày mua</th>
                                <th>Số lượng</th>
                                <th>Tổng tiền</th>
                                <th>Actior</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderList.map((order, index) => {
                                    return (
                                        <tr key={order.id}>
                                            <td>{index}</td>
                                            <td>{order.id}</td>
                                            <td>{order.product.name}</td>
                                            <td>{order.product.price}</td>
                                            <td>{order.product.type}</td>
                                            <td>{converDate(order.buyDate)}</td>
                                            <td>{order.quantity}</td>
                                            <td>{order.totalPrice}</td>
                                            <td><a href="#">Sửa</a></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ListOrder;