import {
    ALL_BRANDS_REQUEST,
    ALL_BRANDS_SUCCESS,
    ALL_BRANDS_FAIL,

    BRAND_DETAILS_REQUEST,
    BRAND_DETAILS_SUCCESS,
    BRAND_DETAILS_FAIL,

    NEW_BRAND_REQUEST,
    NEW_BRAND_SUCCESS,
    NEW_BRAND_RESET,
    NEW_BRAND_FAIL,

    DELETE_BRAND_REQUEST,
    DELETE_BRAND_SUCCESS,
    DELETE_BRAND_RESET,
    DELETE_BRAND_FAIL,

    UPDATE_BRAND_REQUEST,
    UPDATE_BRAND_SUCCESS,
    UPDATE_BRAND_RESET,
    UPDATE_BRAND_FAIL,

    GET_BRAND_BY_ID_REQUEST,
    GET_BRAND_BY_ID_SUCCESS,
    GET_BRAND_BY_ID_FAIL,

    CLEAR_ERRORS
} from '../constants/brandConstants'

import axios from 'axios'

export const getBrands = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_BRANDS_REQUEST })

        const { data } = await axios.get(`/api/brands`)
        dispatch({
            type: ALL_BRANDS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_BRANDS_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const getBrandDetailsById = (id) => async (dispatch) => {
    try {

        dispatch({ type: BRAND_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/brand/${id}`)
        dispatch({
            type: BRAND_DETAILS_SUCCESS,
            payload: data.brand
        })

    } catch (error) {
        dispatch({
            type: BRAND_DETAILS_FAIL,
            payload: error.response
        })
    }
}

export const getBrandDetailsByName = (name) => async (dispatch) => {
    try {

        dispatch({ type: BRAND_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/brand/name/${name}`)
        dispatch({
            type: BRAND_DETAILS_SUCCESS,
            payload: data.brand
        })

    } catch (error) {
        dispatch({
            type: BRAND_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// New brand (Admin)
export const newBrand = (name, description) => async (dispatch) => {
    try {

        dispatch({ type: NEW_BRAND_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/admin/brand/new`, { name, description }, config)

        dispatch({
            type: NEW_BRAND_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_BRAND_FAIL,
            payload: error.response.data.message
        })
    }
}


// Delete brand (Admin)
export const deleteBrand = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_BRAND_REQUEST })

        const { data } = await axios.delete(`/api/admin/brand/${id}`)

        dispatch({
            type: DELETE_BRAND_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_BRAND_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update brand (ADMIN)
export const updateBrand = (id, name, description) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_BRAND_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/admin/brand/${id}`, { name, description }, config)

        dispatch({
            type: UPDATE_BRAND_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_BRAND_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}