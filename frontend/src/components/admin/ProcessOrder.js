import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'
import swal from 'sweetalert'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, updateOrderByAdmin, updateStatusOrder, undoStockProduct, clearErrors } from '../../actions/orderActions'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'

const ProcessOrder = ({ match }) => {

    const [status, setStatus] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus, paidAt, deliveredAt, receivedAt } = order
    const { error, isUpdated } = useSelector(state => state.order)

    const orderId = match.params.id;

    useEffect(() => {

        dispatch(getOrderDetails(orderId))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }


        if (isUpdated) {
            alert.success('Order updated successfully');
            dispatch({ type: UPDATE_ORDER_RESET })
        }

    }, [dispatch, alert, error, isUpdated, orderId])



    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}`
    const isDelivery = orderStatus && orderStatus === 'Processing' ? true : false
    const isCancel = orderStatus && orderStatus === 'Processing' ? true : false

    const updateOrderHandler = () => {
        let status = {
            orderStatus: 'Delivering'
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
                    dispatch(updateOrderByAdmin(orderId, status))
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    })
                } else {
                    swal("Your imaginary file is safe!")
                }
            })
    }

    const cancelOrder = () => {
        for (let i = 0; i < orderItems.length; i++) {
            let productId = orderItems[i].product
            let stock = orderItems[i].quantity
            dispatch(undoStockProduct(productId, stock))
        }

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

    return (
        <Fragment>
            <MetaData title={`Process Order # ${order && order._id}`} />
            <div className="row admin-orders">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-6">
                    <Fragment>
                        {loading ? <Loader /> : (
                            <div className="order-details">
                                <div className="my-4">
                                    <h3>Order #{order._id}</h3>
                                </div>
                                <h4 className="mb-4">Shipping Info</h4>
                                <p><b>Name:</b> {user && user.name}</p>
                                <p><b>Phone:</b> {shippingInfo && shippingInfo.phone}</p>
                                <p className="mb-4"><b>Address:</b> {shippingDetails}</p>
                                <p><b>Amount:</b> ${totalPrice}</p>

                                <hr />
                                <h4 className="my-4">Order Items:</h4>
                                <div className="cart-item my-1">
                                    {orderItems && orderItems.map(item => (
                                        <div key={item.product} className="row my-5">
                                            <div className="col-4 col-lg-2">
                                                <img src={item.image} alt={item.name} height="50" width="50" />
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
                                <hr />
                            </div>


                        )}
                    </Fragment>
                </div>
                <div className="col-12 col-md-3 my-4">
                    <div id="order_summary">
                        <p>Payment Method:
                            <span className="order-summary-values">{paymentInfo && paymentInfo.name}</span>
                        </p>
                        <p>Delivered at:
                            <span className={deliveredAt ? "greenColor order-summary-values" : "redColor order-summary-values"}>{deliveredAt ? `${String(deliveredAt).substring(0, 10)}` : "Not Delivery"}</span>
                        </p>
                        <p>Paid at:
                            <span className={paidAt ? "greenColor order-summary-values" : "redColor order-summary-values"}><span>{paidAt ? `${String(paidAt).substring(0, 10)}` : "Not Paid"}</span></span>
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
                        <button className="btn btn-block btn-order-receive" onClick={updateOrderHandler} hidden={isDelivery ? false : true}>Delivery Order</button>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default ProcessOrder
