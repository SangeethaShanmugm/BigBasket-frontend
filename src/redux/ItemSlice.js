import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    cartItems: []

}

const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        //action
        showLoading: (state) => {
            state.loading = true
            console.log(state.loading)
        },
        hideLoading: (state) => {
            state.loading = false
            console.log(state.loading)
        },
        addToCart: (state, action) => {
            // state.cartItems = [...state.cartItems, action.payload]
            // console.log(state.cartItems)
            let newData = state.cartItems.push(action.payload,)
            console.log("newData", newData)
            console.log(state, action)
        },
        updateCart: (state, action) => {
            state.cartItems = state.cartItems.map((item) =>
                item._id === action.payload._id ? { ...item, quantity: action.payload.quantity } : item)
        }
    }
})

export const { showLoading, hideLoading, addToCart, updateCart } = itemSlice.actions
export default itemSlice.reducer