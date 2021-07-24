import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_FEATURED_REQUEST,
    PRODUCT_FEATURED_SUCCESS,
    PRODUCT_FEATURED_FAIL,
    PRODUCT_LATEST_REQUEST,
    PRODUCT_LATEST_SUCCESS,
    PRODUCT_LATEST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
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

//Clear Error
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}