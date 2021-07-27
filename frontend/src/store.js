import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    productsReducer,
    featuredProductsReducer,
    hotProductsReducer,
    latestProductsReducer,
    productDetailsReducer,
    newReviewReducer,
} from './reducers/productReducers'

import {
    authReducer,
    userReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailsReducer
} from './reducers/userReducers'

import { cartReducer } from './reducers/cartReducers'

import {
    newOrderReducer,
    myOrdersReducer,
    orderDetailsReducer,
    allOrdersReducer,
    orderReducer
} from './reducers/orderReducers'

const reducer = combineReducers({

    products: productsReducer,
    hotProducts: hotProductsReducer,
    featuredProducts: featuredProductsReducer,
    latestProducts: latestProductsReducer,
    productDetails: productDetailsReducer,
    newReview: newReviewReducer,

    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,

    cart: cartReducer,

    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
})

const userLoginFromStorage = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : null
const cartItemsFromStorage = userLoginFromStorage ? JSON.parse(localStorage.getItem(userLoginFromStorage.user._id)) : []
const shippingInfoFromStorage = localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}

const initialState = {
    auth: {
        loading: false,
        isAuthenticated: userLoginFromStorage ? true : false,
        userLogin: userLoginFromStorage ? userLoginFromStorage.user : null
    },
    cart: {
        cartItems: cartItemsFromStorage,
        shippingInfo: shippingInfoFromStorage
    },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store