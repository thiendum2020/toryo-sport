import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import { CART_RESET } from '../../constants/cartConstants'

const OrderSuccess = () => {
    const dispatch = useDispatch()
    dispatch({ type: CART_RESET })

    return (
        <Fragment>

            <MetaData title={'Order Success'} />

            <div className="row justify-content-center order-success">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="/images/order_success.png" alt="Order Success" width="150" height="150" />

                    <h2>Order has been placed successfully.</h2>

                    <Link to="/orders/me">Go to my orders</Link>
                </div>

            </div>

        </Fragment>
    )
}

export default OrderSuccess
