import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateItemToCart, removeItemFromCart } from '../../actions/cartActions'
import swal from 'sweetalert'
import NumberFormat from 'react-number-format'

const Cart = ({ history }) => {
    const dispatch = useDispatch()
    const { userLogin } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)
    const uid = userLogin ? userLogin._id : null

    const increaseQty = (id, quantity, size, stock) => {
        const newQty = quantity + 1;
        if (newQty > stock) return
        dispatch(updateItemToCart(id, newQty, size, uid))
    }

    const decreaseQty = (id, size, quantity) => {
        const newQty = quantity - 1;
        if (newQty <= 0) return
        dispatch(updateItemToCart(id, newQty, size, uid))
    }

    const removeCartItemHandler = (id, size) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(removeItemFromCart(id, size, uid))
                    swal("Poof! Your cart items has been deleted!", {
                        icon: "success",
                    })
                } else {
                    swal("Haha Nope!")
                }
            })
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=/order/shipping')
    }

    return (
        <Fragment>
            <MetaData title={'My Cart'} />
            {
                uid ? (
                    <>
                        {
                            cartItems ? (
                                <>
                                    {
                                        cartItems.length === 0 ? <h3 className="container" style={{ margin: "50px auto 400px" }}>Cart is empty</h3> : (
                                            <Fragment>
                                                <div className="container cart" style={{ margin: "50px auto 200px" }}>
                                                    <h3>My cart</h3>
                                                    <div class="row">
                                                        <div className="col-9">
                                                            <table>
                                                                <tbody>
                                                                    <tr className="table-header">
                                                                        <th><b>Product</b></th>
                                                                        <th><b>Size</b></th>
                                                                        <th style={{ paddingLeft: "20px" }}><b>Quantity</b></th>
                                                                        <th style={{ textAlign: "right" }}><b>Subtotal</b></th>
                                                                    </tr>
                                                                    {
                                                                        cartItems.map(item => (
                                                                            <tr key={item.product}>
                                                                                <td>
                                                                                    <div className="cart-info">
                                                                                        <Link to={`/product/${item.product}`}>
                                                                                            <img src={item.image} alt="" />
                                                                                        </Link>
                                                                                        <div style={{ maxWidth: "240px" }}>
                                                                                            <Link to={`/product/${item.product}`}>
                                                                                                <p className="cart-item-name"><b>{item.name}</b></p>
                                                                                            </Link>
                                                                                            <p>
                                                                                                <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'đ '} />
                                                                                            </p>
                                                                                            <span onClick={() => removeCartItemHandler(item.product, item.size)} >Remove</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    {item.size}
                                                                                </td>
                                                                                <td style={{ textAlign: "center" }}>
                                                                                    <div className="product-quantity-wrapper">
                                                                                        <span className="product-quantity-btn" onClick={() => decreaseQty(item.product, item.size, item.quantity)}>
                                                                                            <i className="bx bx-minus"></i>
                                                                                        </span>
                                                                                        <input type="number" className="product-quantity" value={item.quantity} readOnly />
                                                                                        <span className="product-quantity-btn" onClick={() => increaseQty(item.product, item.quantity, item.size, item.stock)}>
                                                                                            <i className="bx bx-plus"></i>
                                                                                        </span>

                                                                                    </div>
                                                                                </td>
                                                                                <td style={{ textAlign: "right" }}>
                                                                                    <NumberFormat value={item.price * item.quantity} displayType={'text'} thousandSeparator={true} prefix={'đ '} />
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="col-3 checkout-wrap">

                                                            <div className="total-price">
                                                                <table>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><h5>Total items: </h5></td>
                                                                            <td><h5>{cartItems.length}</h5></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td><b>Subtotal</b></td>
                                                                            <td>
                                                                                <b>
                                                                                    <NumberFormat value={cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)} displayType={'text'} thousandSeparator={true} prefix={'đ '} />
                                                                                </b>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <button className="btn btn-checkout btn-block" onClick={checkoutHandler}>Proceed To Checkout</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </Fragment>
                                        )
                                    }
                                </>
                            ) : (
                                <h3 className="container" style={{ margin: "50px auto 400px" }}>Cart is empty</h3>
                            )
                        }
                    </>
                ) : (
                    <h3 className="container" style={{ margin: "50px auto 400px" }}>Login to view your cart</h3>
                )
            }
        </Fragment >
    )
}

export default Cart
