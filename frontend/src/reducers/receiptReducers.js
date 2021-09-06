import {
    ADD_TO_RECEIPT, REMOVE_ITEM_RECEIPT, UPDATE_TO_RECEIPT, RECEIPT_RESET, SAVE_SUPPLIER_INFO,
    CREATE_RECEIPT_REQUEST, CREATE_RECEIPT_SUCCESS, CREATE_RECEIPT_FAIL,
    ALL_RECEIPTS_REQUEST, ALL_RECEIPTS_SUCCESS, ALL_RECEIPTS_FAIL,
    RECEIPT_DETAILS_REQUEST, RECEIPT_DETAILS_SUCCESS, RECEIPT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/receiptConstants'


export const importReceiptReducer = (state = { importReceiptItems: [], supplierInfo: {} }, action) => {
    switch (action.type) {

        case ADD_TO_RECEIPT:
            const item = action.payload
            const isItemExist = state.importReceiptItems ? state.importReceiptItems.find(i => i.product === item.product) : null
            if (isItemExist) {
                return {
                    ...state,
                    message: 'Product already exists!',
                    importReceiptItems: state.importReceiptItems
                }
            } else {
                return {
                    ...state,
                    importReceiptItems: [...state.importReceiptItems, item]
                }

            }

        case REMOVE_ITEM_RECEIPT:
            return {
                ...state,
                importReceiptItems: state.importReceiptItems.filter(i => i.product !== action.payload)
            }

        // case UPDATE_TO_RECEIPT:
        //     const updateItem = action.payload;
        //     const isUpdateItemExist = state.cartItems.find(i => i.product === updateItem.product && i.size === updateItem.size)
        //     if (isUpdateItemExist) {

        //         return {
        //             ...state,
        //             cartItems: state.cartItems.map(i => i.product === isUpdateItemExist.product && i.size === isUpdateItemExist.size ? updateItem : i)
        //         }
        //     } else {
        //         return {
        //             ...state,
        //             cartItems: [...state.cartItems, updateItem]
        //         }
        //     }

        case SAVE_SUPPLIER_INFO:
            return {
                ...state,
                supplierInfo: action.payload
            }
        // case RECEIPT_IMPORT:
        //     return {
        //         ...state,
        //         importReceiptItems: action.payload,
        //     }
        case RECEIPT_RESET:
            return {
                importReceiptItems: [],
                supplierInfo: {}
            }
        default:
            return state
    }
}


export const newReceiptReducer = (state = {}, action) => {
    switch (action.type) {

        case CREATE_RECEIPT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CREATE_RECEIPT_SUCCESS:
            return {
                loading: false,
                receipt: action.payload
            }

        case CREATE_RECEIPT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}


export const receiptDetailsReducer = (state = { receipt: {} }, action) => {
    switch (action.type) {

        case RECEIPT_DETAILS_REQUEST:
            return {
                loading: true
            }

        case RECEIPT_DETAILS_SUCCESS:
            return {
                loading: false,
                receipt: action.payload
            }

        case RECEIPT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}


export const allReceiptsReducer = (state = { receipts: [] }, action) => {
    switch (action.type) {

        case ALL_RECEIPTS_REQUEST:
            return {
                loading: true
            }

        case ALL_RECEIPTS_SUCCESS:
            return {
                loading: false,
                receipts: action.payload.receipts
            }

        case ALL_RECEIPTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}
