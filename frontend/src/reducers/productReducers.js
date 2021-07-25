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
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    CLEAR_ERRORS,
} from '../constants/productConstants'

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            }
        case ALL_PRODUCTS_FAIL:
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
export const featuredProductsReducer = (state = { featuredProducts: [] }, action) => {
    switch (action.type) {
        case PRODUCT_FEATURED_REQUEST:
            return {
                loading: true,
                featuredProducts: []
            }
        case PRODUCT_FEATURED_SUCCESS:
            return {
                loading: false,
                featuredProducts: action.payload

            }
        case PRODUCT_FEATURED_FAIL:
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
export const hotProductsReducer = (state = { hotProducts: [] }, action) => {
    switch (action.type) {
        case PRODUCT_HOT_REQUEST:
            return {
                loading: true,
                hotProducts: []
            }
        case PRODUCT_HOT_SUCCESS:
            return {
                loading: false,
                hotProducts: action.payload

            }
        case PRODUCT_HOT_FAIL:
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
export const latestProductsReducer = (state = { latestProducts: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LATEST_REQUEST:
            return {
                loading: true,
                latestProducts: []
            }
        case PRODUCT_LATEST_SUCCESS:
            return {
                loading: false,
                latestProducts: action.payload

            }
        case PRODUCT_LATEST_FAIL:
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

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
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

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REVIEW_RESET:
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
            return state
    }
}