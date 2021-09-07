import {
    ADD_TO_RECEIPT, REMOVE_ITEM_RECEIPT, UPDATE_TO_RECEIPT, SAVE_SUPPLIER_INFO,
    CREATE_RECEIPT_REQUEST, CREATE_RECEIPT_SUCCESS, CREATE_RECEIPT_FAIL,
    ALL_RECEIPTS_REQUEST, ALL_RECEIPTS_SUCCESS, ALL_RECEIPTS_FAIL,
    RECEIPT_DETAILS_REQUEST, RECEIPT_DETAILS_SUCCESS, RECEIPT_DETAILS_FAIL
} from '../constants/receiptConstants'
import axios from 'axios'

export const addItemToImportReceipt = (id, quantity, importPrice) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/product/${id}`)

    dispatch({
        type: ADD_TO_RECEIPT,
        payload: {
            product: data.product._id,
            name: data.product.name,
            image: data.product.images[0].url,
            stock: data.product.stock,
            price: data.product.price,
            quantity: quantity,
            importPrice: importPrice
        }
    })

    localStorage.setItem('importReceiptItems', JSON.stringify(getState().importReceipt.importReceiptItems))
}


export const updateItem = (id, quantity, importPrice) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/product/${id}`)
    console.log(quantity);
    dispatch({
        type: UPDATE_TO_RECEIPT,
        payload: {
            product: data.product._id,
            name: data.product.name,
            image: data.product.images[0].url,
            stock: data.product.stock,
            price: data.product.price,
            quantity: quantity,
            importPrice: importPrice
        }
    })

    localStorage.setItem('importReceiptItems', JSON.stringify(getState().importReceipt.importReceiptItems))
}

export const removeItem = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_RECEIPT,
        payload: {
            id: id
        }
    })
    localStorage.setItem('importReceiptItems', JSON.stringify(getState().importReceipt.importReceiptItems))
}

export const saveSupplierInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SUPPLIER_INFO,
        payload: data
    })

    localStorage.setItem('supplierInfo', JSON.stringify(data))

}

export const createReceipt = (receipt) => async (dispatch, getState) => {
    try {

        dispatch({ type: CREATE_RECEIPT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/admin/receipt/new', receipt, config)

        dispatch({
            type: CREATE_RECEIPT_SUCCESS,
            payload: data
        })
        localStorage.removeItem('importReceiptItems')

    } catch (error) {
        dispatch({
            type: CREATE_RECEIPT_FAIL,
            payload: error.response.data.message
        })
    }
}


// Get receipt details
export const getReceiptDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: RECEIPT_DETAILS_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.get(`/api/admin/receipt/${id}`, config)
        dispatch({
            type: RECEIPT_DETAILS_SUCCESS,
            payload: data.receipt
        })

    } catch (error) {
        dispatch({
            type: RECEIPT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get all receipts - ADMIN
export const allReceipts = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_RECEIPTS_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.get(`/api/admin/receipts`, config)

        dispatch({
            type: ALL_RECEIPTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_RECEIPTS_FAIL,
            payload: error.response.data.message
        })
    }
}
