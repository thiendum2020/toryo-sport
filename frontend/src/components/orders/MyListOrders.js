import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import NumberFormat from 'react-number-format'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { myOrders, clearErrors } from '../../actions/orderActions'
import MenuProfile from '../user/MenuProfile'

const MyListOrders = () => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, orders } = useSelector(state => state.myOrders)

    useEffect(() => {
        dispatch(myOrders())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Created At',
                    field: 'createdAt',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        orders && orders.forEach(order => {
            data.rows.push({
                id: order._id,
                createdAt: String(order.createdAt).substring(0, 10),
                amount: [<NumberFormat value={order.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} ></NumberFormat>],
                status: order.orderStatus && String(order.orderStatus).includes('Delivering')
                    ? <p style={{ color: 'blue' }}>{order.orderStatus}</p>
                    : order.orderStatus && String(order.orderStatus).includes('Cancelled')
                        ? <p style={{ color: 'red' }}>{order.orderStatus}</p>
                        : order.orderStatus && String(order.orderStatus).includes('Received')
                            ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                            : <p style={{ color: 'orange' }}>{order.orderStatus}</p>,
                actions:
                    <Link to={`/profile/order/${order._id}`} className="btn-order-details">
                        <i className="fa fa-eye"></i>
                    </Link>
            })
        })

        return data
    }

    return (
        <Fragment>

            <MetaData title={'My Orders'} />
            <div className="container">

                <div class="row">
                    <div className="col-2">
                        <MenuProfile />
                    </div>
                    <div className="col-10">
                        <div className="my-orders">
                            <h3>My Orders</h3>

                            {
                                loading ? (
                                    <>
                                        <div style={{ padding: '50px 0 100px 0' }}></div>
                                        <Loader />
                                    </>
                                )
                                    : (
                                        orders && orders.length === 0 ? (
                                            <>
                                                <h4 style={{ margin: '60px 0 300px' }}>Orders is empty</h4>
                                            </>
                                        ) : (
                                            <MDBDataTableV5
                                                data={setOrders()}
                                                className="px-3"
                                                entriesOptions={[10, 20, 50]}
                                                entries={10}
                                                hover
                                                searchTop
                                                searchBottom={false}
                                                barReverse
                                            />
                                        )
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default MyListOrders
