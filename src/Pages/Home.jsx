import React, { useEffect, useState } from 'react'
import { API } from '../global'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Item from './Item'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [itemData, setItemData] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartItems = useSelector((state) => state.itemShop.cartItems)

    console.log(cartItems)

    useEffect(() => {
        axios.get(`${API}/items/get-items`)
            .then((res) => {
                dispatch({ type: "hideloading" })
                setItemData(res.data)
            })
            .catch((err) => {
                dispatch({ type: "hideloading" })
                console.log(err)
            })
    }, [])

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }, [cartItems])



    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            alignItems: "flex-start",
            marginTop: "20px",
        }}>


            <div> <button type="button" className='btn btn-primary position-relative' onClick={() => navigate("/cart")}>Cart
                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{cartItems.length}</span></button></div>


            {
                itemData.map((item, index) => (
                    <Item key={index} item={item} />
                ))
            }
        </div>
    )
}

export default Home