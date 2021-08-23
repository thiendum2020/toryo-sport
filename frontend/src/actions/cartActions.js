import axios from 'axios'
import { ADD_TO_CART, REMOVE_ITEM_CART, UPDATE_TO_CART, SAVE_SHIPPING_INFO } from '../constants/cartConstants'

export const addItemToCart = (id, quantity, size, uid) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/product/${id}`)

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
            size: size
        }
    })

    localStorage.setItem(uid, JSON.stringify(getState().cart.cartItems))
}

export const updateItemToCart = (id, quantity, size, uid) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/product/${id}`)

    dispatch({
        type: UPDATE_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
            size: size
        }
    })

    localStorage.setItem(uid, JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id, size, uid) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: {
            id: id,
            size: size
        }
    })

    localStorage.setItem(uid, JSON.stringify(getState().cart.cartItems))

}

export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data))

}