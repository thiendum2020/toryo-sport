import {
    ALL_BRANDS_REQUEST,
    ALL_BRANDS_SUCCESS,
    ALL_BRANDS_FAIL,

    BRAND_DETAILS_REQUEST,
    BRAND_DETAILS_SUCCESS,
    BRAND_DETAILS_FAIL,
    BRAND_DETAILS_RESET,

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

export const brandsReducer = (state = { brands: [] }, action) => {
    switch (action.type) {
        case ALL_BRANDS_REQUEST:
            return {
                loading: true,
                brands: []
            }
        case ALL_BRANDS_SUCCESS:
            return {
                loading: false,
                brands: action.payload.brands,
            }

        case ALL_BRANDS_FAIL:
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
            return state
    }
}

export const brandDetailsReducer = (state = { brand: {} }, action) => {
    switch (action.type) {
        case BRAND_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case BRAND_DETAILS_SUCCESS:
            return {
                loading: false,
                brand: action.payload
            }
        case BRAND_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case BRAND_DETAILS_RESET:
            return {
                loading: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
//Admin
export const newBrandReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_BRAND_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_BRAND_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                brand: action.payload.brand
            }

        case NEW_BRAND_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_BRAND_RESET:
            return {
                ...state,
                success: false
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

export const brandReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_BRAND_REQUEST:
        case UPDATE_BRAND_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_BRAND_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_BRAND_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_BRAND_FAIL:
        case UPDATE_BRAND_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_BRAND_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_BRAND_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
