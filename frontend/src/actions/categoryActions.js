import {
    ALL_CATEGORIES_REQUEST,
    ALL_CATEGORIES_SUCCESS,
    ALL_CATEGORIES_FAIL,

    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,

    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_RESET,
    NEW_CATEGORY_FAIL,

    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_RESET,
    DELETE_CATEGORY_FAIL,

    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_RESET,
    UPDATE_CATEGORY_FAIL,

    GET_CATEGORY_BY_ID_REQUEST,
    GET_CATEGORY_BY_ID_SUCCESS,
    GET_CATEGORY_BY_ID_FAIL,

    CLEAR_ERRORS
} from '../constants/categoryConstants'

import axios from 'axios'

export const getCategories = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORIES_REQUEST })

        const { data } = await axios.get(`/api/categories`)
        dispatch({
            type: ALL_CATEGORIES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_CATEGORIES_FAIL,
            payload: error.response,
        })
    }
}

export const getCategoryDetailsById = (id) => async (dispatch) => {
    try {

        dispatch({ type: CATEGORY_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/category/${id}`)
        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data.category
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload: error.response
        })
    }
}

export const getCategoryDetailsByName = (name) => async (dispatch) => {
    try {

        dispatch({ type: CATEGORY_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/category/name/${name}`)
        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data.category
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// New category (Admin)
export const newCategory = (name, description) => async (dispatch) => {
    try {

        dispatch({ type: NEW_CATEGORY_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/admin/category/new`, { name, description }, config)

        dispatch({
            type: NEW_CATEGORY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}


// Delete category (Admin)
export const deleteCategory = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_CATEGORY_REQUEST })

        const { data } = await axios.delete(`/api/admin/category/${id}`)

        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update category (ADMIN)
export const updateCategory = (id, name, description) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_CATEGORY_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/admin/category/${id}`, { name, description }, config)

        dispatch({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
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