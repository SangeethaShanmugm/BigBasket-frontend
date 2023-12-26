import React from 'react'
import { Card, Button } from "antd"
import { useDispatch } from 'react-redux'
const { Meta } = Card
function Item({ item }) {
    const dispatch = useDispatch()

    const addToCart = () => {
        console.log("Add To cart")
        const payload = dispatch({ type: "addToCart", payload: { ...item, quantity: 1 } })
        console.log(payload)
    }

    return (
        <div>
            <Card hoverable style={{ width: 250, marginTop: "50px" }} cover={<img style={{
                width: "100%",
                height: "250px",
                objectFit: "contain"
            }}
                src={item.image} alt={item.name} />}>
                <Meta title={item.name} />
                <h4>Price: Rs. {item.price}</h4>
                <Button type="primary" onClick={() => addToCart()}>Add to Cart</Button>
            </Card>
        </div>
    )
}

export default Item