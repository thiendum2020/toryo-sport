import React, { Fragment, useEffect } from 'react'

import MetaData from '../layouts/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'

import axios from 'axios'

const Payment = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { userLogin } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { error } = useSelector(state => state.newOrder)

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        document.querySelector('#pay_btn').disabled = true

        try {

            order.paymentInfo = {
                name: 'Ship COD',
                status: 'no'
            }

            dispatch(createOrder(order))

            history.push('/order/success')

        } catch (error) {
            document.querySelector('#pay_btn').disabled = false;
            alert.error(error.response.data.message)
        }
    }

    return (
        <Fragment>
            <MetaData title={'Payment'} />

            <div className="container">
                <CheckoutSteps shipping confirmOrder payment />
                <div className="payment-method">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Select Payment Method</h1>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="Ship COD" id="ship_cod" defaultChecked />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Ship COD
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="Momo" id="momo" disabled />
                            <label className="form-check-label" htmlFor="flexRadioDisabled">
                                Thanh toán bằng Momo (Chưa ra mắt)
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="Shopee Pay" id="shopee_pay" disabled />
                            <label className="form-check-label" htmlFor="flexRadioDisabled">
                                Thanh toán bằng Shopee Pay (Chưa ra mắt)
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="Zalo Pay" id="zalo_pay" disabled />
                            <label className="form-check-label" htmlFor="flexRadioDisabled">
                                Thanh toán bằng Zalo Pay (Chưa ra mắt)
                            </label>
                        </div>
                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3">
                            Pay - ${`${orderInfo && orderInfo.totalPrice}`}
                        </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Payment
