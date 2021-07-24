import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateItemToCart, removeItemFromCart } from '../../actions/cartActions'

const Cart = ({ history }) => {
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;

        if (newQty > stock) return;

        dispatch(updateItemToCart(id, newQty))
    }

    const decreaseQty = (id, quantity) => {

        const newQty = quantity - 1;

        if (newQty <= 0) return;

        dispatch(updateItemToCart(id, newQty))

    }

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=/order/shipping')
    }

    return (
        <Fragment>
            <MetaData title={'My Cart'} />
            {
                cartItems ? (

                    <>
                        {
                            cartItems.length === 0 ? <h3 className="container" style={{ margin: "50px auto 200px" }}>Cart is empty</h3> : (
                                <Fragment>
                                    <div className="container cart" style={{ margin: "50px auto 200px" }}>
                                        <h3>My cart</h3>
                                        <div class="row">
                                            <div className="col-8">
                                                <table>
                                                    <tbody>
                                                        <tr className="table-header">
                                                            <th><b>Product</b></th>
                                                            <th style={{ paddingLeft: "20px" }}><b>Quantity</b></th>
                                                            <th style={{ textAlign: "right" }}><b>Subtotal</b></th>
                                                        </tr>
                                                        {
                                                            cartItems.map(item => (
                                                                <tr key={item.product}>
                                                                    <td>
                                                                        <div className="cart-info">
                                                                            <Link to={`/products/${item.product}`}>
                                                                                <img src={item.image} alt="" />
                                                                            </Link>
                                                                            <div>
                                                                                <Link to={`/products/${item.product}`}>
                                                                                    <p><b>{item.name}</b></p>
                                                                                </Link>
                                                                                <p>Price: ${item.price}</p>
                                                                                <span onClick={() => removeCartItemHandler(item.product)} >Remove</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td style={{ textAlign: "center" }}>
                                                                        <div className="product-quantity-wrapper">
                                                                            <span className="product-quantity-btn" onClick={() => decreaseQty(item.product, item.quantity)}>
                                                                                <i className="bx bx-minus"></i>
                                                                            </span>
                                                                            <input type="number" className="product-quantity" value={item.quantity} readOnly />
                                                                            <span className="product-quantity-btn" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>
                                                                                <i className="bx bx-plus"></i>
                                                                            </span>

                                                                        </div>
                                                                    </td>
                                                                    <td style={{ textAlign: "right" }}>${item.price * item.quantity}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="col-4 checkout-wrap">

                                                <div className="total-price">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td><h5>Total items: </h5></td>
                                                                <td><h5>{cartItems.length}</h5></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Subtotal</td>
                                                                <td>${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <button className="btn btn-checkout" onClick={checkoutHandler}>Proceed To Checkout</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </Fragment>
                            )
                        }
                    </>
                ) : (
                    <h3 className="container" style={{ margin: "50px auto 200px" }}>Cart is empty</h3>
                )
            }
        </Fragment >
    )
}

export default Cart
