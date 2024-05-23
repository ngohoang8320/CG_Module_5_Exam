import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import '../assests/css/CreateOrder.css';
import { persistOrder } from "../services/OrderService";
import { getAllProduct } from "../services/ProductService";

function CreateOrder() {
    const [form, setForm] = useState({
        id: "",
        buyDate: "",
        totalPrice: "",
        quantity: "",
        product: {
            id: "",
            name: "",
            price: "",
            type: "",
        },
    });
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProds();
    }, []);

    const getProds = async () => {
        const prodList = await getAllProduct();
        setProducts(prodList);
    }

    const navigation = useNavigate();

    const today = new Date();

    const validationSchema = Yup.object({
        id: Yup.number().required("This field have to be filled!"),
        buyDate: Yup.date().max(today, "Date cannot be in the future").required("This field have to be filled!"),
        totalPrice: Yup.number().required("This field have to be filled!"),
        quantity: Yup.number().min(0, "Have to greater than 0").required("This field have to be filled!"),
        product: Yup.object({
            id: Yup.number().required("This field have to be filled!"),
            name: Yup.string().required("This field have to be filled!"),
            price: Yup.number().required("This field have to be filled!"),
            type: Yup.string().required("This field have to be filled!"),
        }),
    });

    const submitHandler = async (submittedObject) => {
        try {
            await persistOrder(submittedObject);
            navigation("/orders");
            toast.success("Add successful!");
        } catch {
            toast.error("Error!");
        }
    };

    return (
        <>
            <div className="container">
                <h2>Thêm mới đơn hàng</h2>
                <Formik
                    enableReinitialize
                    initialValues={form}
                    onSubmit={submitHandler}
                    validationSchema={validationSchema}
                >
                    <Form className="input-container">
                        <Field
                            className="input-create"
                            placeholder="Order Id"
                            name="id"
                            type="number"
                        />
                        <ErrorMessage name="id" component="span" className="error-message" />

                        <Field
                            className="input-create"
                            placeholder="Buy date"
                            name="buyDate"
                            type="date"
                        />
                        <ErrorMessage name="buyDate" component="span" className="error-message" />

                        <Field
                            className="input-create"
                            placeholder="Total Price"
                            name="totalPrice"
                            type="number"
                        />
                        <ErrorMessage name="totalPrice" component="span" className="error-message" />

                        <Field
                            className="input-create"
                            placeholder="Quantity"
                            name="quantity"
                            type="number"
                        />
                        <ErrorMessage name="quantity" component="span" className="error-message" />

                        <Field
                            className="input-create"
                            placeholder="Product id"
                            name="product.id"
                            type="number"
                        />
                        <ErrorMessage name="product.id" component="span" className="error-message" />

                        <Field
                            className="input-create"
                            placeholder="Product name"
                            name="product.name"
                            type="text"
                        />
                        <ErrorMessage name="product.name" component="span" className="error-message" />

                        <Field
                            className="input-create"
                            placeholder="Price per product"
                            name="product.price"
                            type="number"
                        />
                        <ErrorMessage name="product.price" component="span" className="error-message" />

                        <Field
                            className="input-create"
                            placeholder="Product's type"
                            name="product.type"
                            type="text"
                        />
                        <ErrorMessage name="product.type" component="span" className="error-message" />

                        <Field
                            className="input-create"
                            name="product"
                            as="select"
                        >
                            <option value="">Vui lòng chọn sản phẩm</option>
                            {
                                products.map((prod) => {
                                    return (
                                        <option key={prod.id} value={JSON.stringify(prod)}>{prod.name}</option>
                                    )
                                })
                            }
                        </Field>

                        <button type="submit" className="create-button">
                            Tạo mới
                        </button>
                    </Form>
                </Formik>
            </div>
        </>
    );
}

export default CreateOrder;