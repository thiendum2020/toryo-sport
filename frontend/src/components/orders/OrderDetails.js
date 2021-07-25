import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import MenuProfile from '../user/MenuProfile'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, clearErrors } from '../../actions/orderActions'

const OrderDetails = ({ match }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus, paidAt } = order


    //no chay 2 lan 
    //lan 1 undifine
    //lan 2 nios co
    //sao nó chạy 2 lần m
    // là request 1 lần làm thay đổi cái state
    //lần 2 có dữ liệ nó cso dỡ liệu nên chạy lần 2
    //à là mới vô chưa có state, request có state đổi nên chạy lại đúng k
    //ukm mở cái action với reducer là thấy action gọi tới rẻducer

    console.log(paymentInfo)
    useEffect(() => {
        dispatch(getOrderDetails(match.params.id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, match.params.id])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}`

    const isPaid = paymentInfo && paymentInfo.status === 'ok' ? true : false

    return (
        <Fragment>
            <MetaData title={'Order Details'} />

            {loading ? <Loader /> : (

                <Fragment>
                    <div className="container">
                        <div class="row">
                            <div className="col-2">
                                <MenuProfile />
                            </div>
                            <div className="col-10">

                                <h3 className="my-5">Order #{order._id}</h3>

                                <h5 className="mb-4">Shipping Info</h5>
                                <p><b>Name: </b> {user && user.name}</p>
                                <p><b>Phone: </b> {shippingInfo && shippingInfo.phone}</p>
                                <p className="mb-4"><b>Address: </b>{shippingDetails}</p>
                                <p><b>Amount:</b> ${totalPrice}</p>

                                <hr />

                                <h5 className="my-4">Payment Method: {paymentInfo && paymentInfo.name}</h5>

                                <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? `PAID at ${paidAt}` : "NOT PAID"}</b></p>


                                <h5 className="my-4">Order Status:</h5>
                                <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>


                                <h5 className="my-4">Order Items:</h5>

                                <hr />
                                <div className="cart-item my-1">
                                    {orderItems && orderItems.map(item => (
                                        <div key={item.product} className="row my-5">
                                            <div className="col-4 col-lg-2">
                                                <img src={item.image} alt={item.name} height="45" width="65" />
                                            </div>

                                            <div className="col-5 col-lg-5">
                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
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
                        </div>
                    </div>
                </Fragment>
            )
            }

        </Fragment >
    )
}

export default OrderDetails
