import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_FEATURED_REQUEST,
    PRODUCT_FEATURED_SUCCESS,
    PRODUCT_FEATURED_FAIL,
    PRODUCT_HOT_REQUEST,
    PRODUCT_HOT_SUCCESS,
    PRODUCT_HOT_FAIL,
    PRODUCT_LATEST_REQUEST,
    PRODUCT_LATEST_SUCCESS,
    PRODUCT_LATEST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS,
} from '../constants/productConstants'

import axios from 'axios'

export const getProducts = (keyword = '', currentPage = 1, price, category, brand) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST })
        let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`
        if (category) {
            link = `/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`
        }
        if (brand) {
            link = `/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&brand=${brand}`
        }
        if (category && brand) {
            link = `/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&brand=${brand}`
        }
        const { data } = await axios.get(link)
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const getFeaturedProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_FEATURED_REQUEST })
        const { data } = await axios.get('/api/products/featured')
        dispatch({
            type: PRODUCT_FEATURED_SUCCESS,
            payload: data.featuredProducts
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_FEATURED_FAIL,
            payload: error.response.data.message,
        })
    }
}
export const getHotProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_HOT_REQUEST })
        const { data } = await axios.get('/api/products/hot')
        dispatch({
            type: PRODUCT_HOT_SUCCESS,
            payload: data.hotProducts
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_HOT_FAIL,
            payload: error.response.data.message,
        })
    }
}
export const getLatestProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LATEST_REQUEST })
        const { data } = await axios.get('/api/products/latest')
        dispatch({
            type: PRODUCT_LATEST_SUCCESS,
            payload: data.latestProducts
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LATEST_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const getProductCollections = (currentPage = 1, price, collections, collection) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST })
        let link = `/api/products?page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`
        if (collections === 'brand') {
            link = `/api/products?page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&brand=${collection}`
        }
        if (collections === 'category') {
            link = `/api/products?page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${collection}`
        }
        const { data } = await axios.get(link)
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/product/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/review`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

//ADMIN
export const getAdminProducts = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PRODUCTS_REQUEST })

        const { data } = await axios.get(`/api/admin/products`)

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })

    } catch (error) {

        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

// New product (Admin)
export const newProduct = (name, price, stock, description, category, brand, images) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(images)
        const { data } = await axios.post(`/api/admin/product/new`, { name, price, stock, description, category, brand, images }, config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete product (Admin)
export const deleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PRODUCT_REQUEST })

        const { data } = await axios.delete(`/api/admin/product/${id}`)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Product (ADMIN)
export const updateProduct = (id, name, price, stock, description, category, brand, images) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/admin/product/${id}`, { id, name, price, stock, description, category, brand, images }, config)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get product reviews
export const getProductReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_REVIEWS_REQUEST })

        const { data } = await axios.get(`/api/reviews?id=${id}`)

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {

        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Delete product review
export const deleteReview = (id, productId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REVIEW_REQUEST })

        const { data } = await axios.delete(`/api/reviews?id=${id}&productId=${productId}`)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        console.log(error.response);

        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}
//Clear Error
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}