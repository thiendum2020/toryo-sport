import { ADD_TO_CART, REMOVE_ITEM_CART, UPDATE_TO_CART, SAVE_SHIPPING_INFO, CART_RESET, CART_IMPORT } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {

        case ADD_TO_CART:
            const item = action.payload
            const isItemExist = state.cartItems ? state.cartItems.find(i => i.product === item.product && i.size === item.size) : null
            console.log(isItemExist);
            if (isItemExist) {
                state.cartItems.map(i => {
                    if (i.product === isItemExist.product && i.size === isItemExist.size) {

                        i.quantity = i.quantity + item.quantity

                    }
                })

                return {
                    ...state,
                    cartItems: state.cartItems
                }
            } else {
                console.log(state.cartItems);
                if (state.cartItems) {
                    console.log('ac');
                    return {
                        ...state,
                        cartItems: [...state.cartItems, item]
                    }
                } else {
                    return {
                        ...state,
                        cartItems: [item]
                    }
                }
            }

        case REMOVE_ITEM_CART:
            let isItemRemove = state.cartItems.find(i => i.product === action.payload.id && i.size === action.payload.size)
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i !== isItemRemove)
            }

        case UPDATE_TO_CART:
            const updateItem = action.payload;
            const isUpdateItemExist = state.cartItems.find(i => i.product === updateItem.product && i.size === updateItem.size)
            if (isUpdateItemExist) {

                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === isUpdateItemExist.product && i.size === isUpdateItemExist.size ? updateItem : i)
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
        case CART_IMPORT:
            return {
                ...state,
                cartItems: action.payload,
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