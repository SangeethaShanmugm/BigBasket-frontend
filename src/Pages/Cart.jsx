import { Button, Table, Modal, Form, Input, Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons"
import axios from 'axios'
import { API } from '../global'
import { useNavigate } from 'react-router-dom'
function Cart() {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.itemShop.cartItems)
    const [subTotal, setSubTotal] = useState(0)
    const [billChargeModel, setBillChargeModel] = useState(false)
    const [quantity, setQuantity] = useState(1)
    console.log(cartItems)
    const navigate = useNavigate()

    // const increaseQuantity = (itemId) => {
    //     // setQuantity((prevCartItems) => prevCartItems.map((item) => item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item)
    //     // )
    //     // dispatch({ type: "updateCart", payload: { ...record, quantity: record.quantity + 1 } })
    // }

    // const decreaseQuantity = (itemId) => {
    //     if (quantity > 1) {
    //         setQuantity(quantity - 1)
    //         // dispatch({ type: "updateCart", payload: { ...record, quantity: record.quantity + -1 } })

    //     }
    // }

    useEffect(() => {
        let temp = 0;
        cartItems.forEach((item) => {
            temp = temp + item.price * 1
        })

        setSubTotal(temp)
    }, [cartItems])

    const onFinish = (values) => {
        const reqObject = {
            ...values,
            subTotal,
            cartItems,
            tax: Number(((subTotal / 100) * 10).toFixed(2)),
            totalAmount: Number((subTotal + (subTotal / 100) * 10)),
            userId: JSON.parse(localStorage.getItem("user_data"))._id
        }

        axios.post(`${API}/bill/charge-bill`, reqObject)
            .then(() => {
                message.success("Bill added successfully")
                navigate("/bills")
            })

    }

    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (image, record) => (
                <img src={image} alt="" width="50" height="50" />
            )
        },
        {
            title: "Price",
            dataIndex: "price"
        },
        // {
        //     title: "Quantity",
        //     dataIndex: "_id",
        //     render: (item) => (
        //         <>
        //             {/* <button onClick={() => increaseQuantity(item._id)}>+</button>
        //             <span>{quantity}</span>
        //             <button onClick={() => decreaseQuantity(item._id)}>-</button> */}
        //         </>
        //     )
        // }
        // {
        //     title: "Quantity",
        //     dataIndex: "_id",
        //     render: (id, record = { quantity: 1 }) => (
        //         <div>
        //             <PlusCircleOutlined className="mx-3" onClick={() => increaseQuantity(record)} />
        //             <b>{record.quantity}</b>
        //             <MinusCircleOutlined className="mx-3" onClick={() => decreaseQuantity(record)} />
        //         </div>
        //     )
        // },

    ]

    return (
        <>
            <h1>Cart Items</h1>
            <Table dataSource={cartItems} columns={columns} bordered pagination={false} />
            <hr />

            <div className='d-flex justify-content-end flex-column'>
                <div>
                    <h3>SUB TOTAL: <b>{subTotal}</b></h3>
                </div>
            </div>

            <Button type="primary" onClick={() => setBillChargeModel(true)}>Charge Bill</Button>

            <Modal title="Charge Bill" visible={billChargeModel} footer={false} onCancel={() => setBillChargeModel(false)}>
                <Form onFinish={onFinish}>
                    <Form.Item name="customerName" label="Customer Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="customerPhoneNumber" label="Phone Number">
                        <Input />
                    </Form.Item>
                    <Form.Item name="paymentMode" label="Payment Mode">
                        <Select>
                            <Select.Option value="cash">CASH</Select.Option>
                            <Select.Option value="card">CARD</Select.Option>
                        </Select>
                    </Form.Item>
                    <div>
                        <h3>SubTotal: <b>Rs.{subTotal}</b></h3>
                        <h5>Tax: <b>Rs. {((subTotal / 100) * 10).toFixed(2)}</b></h5>
                        <h5>Grand Total: <b>Rs. {subTotal + (subTotal / 100) * 10}</b></h5>
                    </div>
                    <div className='d-flex justify-content-end'><Button htmlType="submit" type="primary">GENERATE BILL</Button></div>
                </Form>
            </Modal>
            {/* <div><h1>Cart Items</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => {
                            return (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>1</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </div> */}
        </>
    )
}

export default Cart