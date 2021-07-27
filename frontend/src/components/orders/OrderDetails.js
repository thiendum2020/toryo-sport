import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import MenuProfile from '../user/MenuProfile'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, updateStatusOrder, clearErrors } from '../../actions/orderActions'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'
import swal from 'sweetalert'

const OrderDetails = ({ match }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus, paidAt, deliveredAt, receivedAt } = order
    const { error: errorUpdateOrder, isUpdated } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(getOrderDetails(match.params.id))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success('Order updated successfully');
            dispatch({ type: UPDATE_ORDER_RESET })
        }
    }, [dispatch, alert, isUpdated, error, match.params.id])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}`
    const isCancel = orderStatus && orderStatus === 'Processing' ? true : false
    const isReceive = orderStatus && orderStatus === 'Delivering' ? true : false
    console.log(orderStatus)
    const cancelOrder = () => {
        let status = {
            orderStatus: 'Cancelled'
        }
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(updateStatusOrder(match.params.id, status))
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    })
                } else {
                    swal("Your imaginary file is safe!")
                }
            })
    }

    const receivedOrder = () => {
        let status = {
            orderStatus: 'Received'
        }
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(updateStatusOrder(match.params.id, status))
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    })
                } else {
                    swal("Your imaginary file is safe!")
                }
            })
    }

    return (
        <Fragment>
            <MetaData title={'Order Details'} />
            <div className="container">
                <div class="row">
                    <div className="col-2">
                        <MenuProfile />
                    </div>
                    <div className="col-10">
                        {
                            loading ? <Loader /> : (

                                <Fragment>
                                    <div className="my-orders">
                                        <div className="row">
                                            <div className="col-7">
                                                <h4 className="mb-4">Order #{order._id}</h4>

                                                <p><b>Name: </b> {user && user.name}</p>
                                                <p><b>Phone: </b> {shippingInfo && shippingInfo.phone}</p>
                                                <p><b>Address: </b>{shippingDetails}</p>
                                                <p><b>Amount:</b> ${totalPrice}</p>

                                                <h5 className="my-4">Order Items:</h5>

                                                <hr />
                                                <div className="cart-item my-1">
                                                    {orderItems && orderItems.map(item => (
                                                        <div key={item.product} className="row my-5">
                                                            <div className="col-4 col-lg-2">
                                                                <img src={item.image} alt={item.name} height="45" width="65" />
                                                            </div>

                                                            <div className="col-5 col-lg-5">
                                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                            </div>


                                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                                <p>${item.price}</p>
                                                            </div>

                                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                                <p>{item.quantity} Piece(s)</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="col-5">
                                                <div id="order_summary">
                                                    <p>Payment Method:
                                                        <span className="order-summary-values">{paymentInfo && paymentInfo.name}</span>
                                                    </p>
                                                    <p>Delivered at:
                                                        <span className={deliveredAt ? "greenColor order-summary-values" : "redColor order-summary-values"}>{deliveredAt ? `${String(deliveredAt).substring(0, 10)}` : "Not Delivery"}</span>
                                                    </p>
                                                    <p>Paid at:
                                                        <span className={paidAt ? "greenColor order-summary-values" : "redColor order-summary-values"}><b>{paidAt ? `${String(paidAt).substring(0, 10)}` : "Not Paid"}</b></span>
                                                    </p>
                                                    <p>Received at:
                                                        <span className={receivedAt ? "greenColor order-summary-values" : "redColor order-summary-values"}>{receivedAt ? `${String(receivedAt).substring(0, 10)}` : "Not Received"}</span>
                                                    </p>
                                                    <p>Order Status:
                                                        <span
                                                            className={
                                                                order.orderStatus && String(order.orderStatus).includes('Delivering') ? "blueColor order-summary-values"
                                                                    : order.orderStatus && String(order.orderStatus).includes('Received') ? "greenColor order-summary-values"
                                                                        : order.orderStatus && String(order.orderStatus).includes('Cancelled') ? "redColor order-summary-values"
                                                                            : "yellowColor order-summary-values"
                                                            }>
                                                            {orderStatus}
                                                        </span>
                                                    </p>
                                                    <hr />
                                                    <button className="btn btn-block btn-order-cancel" onClick={cancelOrder} hidden={isCancel ? false : true}>Cancel Order</button>
                                                    <button className="btn btn-block btn-order-receive" onClick={receivedOrder} hidden={isReceive ? false : true}>Received Order</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        }
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default OrderDetails
