import { ADD_TO_CART, REMOVE_ITEM_CART, UPDATE_TO_CART, SAVE_SHIPPING_INFO, CART_RESET } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {

        case ADD_TO_CART:
            const item = action.payload;

            const isItemExist = state.cartItems.find(i => i.product === item.product)

            if (isItemExist) {
                state.cartItems.map(i => {
                    if (i.product === isItemExist.product) {
                        i.quantity = i.quantity + item.quantity
                    }
                })

                return {
                    ...state,
                    cartItems: state.cartItems
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }

        case UPDATE_TO_CART:
            const updateItem = action.payload;

            const isUpdateItemExist = state.cartItems.find(i => i.product === updateItem.product)

            if (isUpdateItemExist) {

                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === isUpdateItemExist.product ? updateItem : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, updateItem]
                }
            }

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }
        case CART_RESET:
            return {
                cartItems: [],
                shippingInfo: {}
            }
        default:
            return state
    }
}