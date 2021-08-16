import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allOrders, deleteOrder, clearErrors } from '../../actions/orderActions'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'

const OrdersList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Order deleted successfully');
            history.push('/admin/orders');
            dispatch({ type: DELETE_ORDER_RESET })
        }

    }, [dispatch, alert, error, isDeleted, history])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

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
                    label: 'Total Prices',
                    field: 'totalPrices',
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
                },
            ],
            rows: []
        }

        orders && orders.forEach(order => {
            data.rows.push({
                id: order._id,
                createdAt: String(order.createdAt).substring(0, 10),
                amount: order.orderItems.length,
                totalPrices: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivering')
                    ? <p style={{ color: 'blue' }}>{order.orderStatus}</p>
                    : order.orderStatus && String(order.orderStatus).includes('Cancelled')
                        ? <p style={{ color: 'red' }}>{order.orderStatus}</p>
                        : order.orderStatus && String(order.orderStatus).includes('Received')
                            ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                            : <p style={{ color: 'orange' }}>{order.orderStatus}</p>,
                actions:
                    <Link to={`/admin/order/${order._id}`} className="btn-order-details" style={{ paddingLeft: '16px' }}>
                        <i className="fa fa-eye"></i>
                    </Link>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'All Orders'} />
            <div className="row admin-orders">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="users-list-header my-4">
                            <h3>All Orders (Total: {orders && orders.length})</h3>
                        </div>

                        {loading ? <Loader /> : (
                            <MDBDataTableV5
                                data={setOrders()}
                                className="px-3"
                                entriesOptions={[10, 20, 50]}
                                entries={10}
                                hover
                                searchTop
                                searchBottom={false}
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default OrdersList
