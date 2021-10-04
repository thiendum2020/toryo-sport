import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'
import swal from 'sweetalert'
import NumberFormat from 'react-number-format'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getReceiptDetails } from '../../actions/receiptAction'

const ReceiptDetails = ({ match }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, receipt = {} } = useSelector(state => state.receiptDetails)
    const { supplier, totalImportPrice, user, receiptItems, createdAt } = receipt
    const receiptId = match.params.id;

    useEffect(() => {

        dispatch(getReceiptDetails(match.params.id))

    }, [dispatch, alert, match.params.id])
    return (
        <Fragment>
            <MetaData title={`Receipt # ${receiptId}`} />
            <div className="row admin-orders">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-8" style={{ paddingTop: '60px' }}>
                    <Fragment>



                        <h4 className="mb-3" >Supplier Info</h4>
                        <p><b>Name: </b> {supplier && supplier.name}</p>
                        <p><b>Phone: </b> {supplier && supplier.phone}</p>
                        <p><b>Address: </b> {supplier && supplier.address}</p>
                        <p><b>Country: </b> {supplier && supplier.country}</p>
                        <p><b>Total Import Price: <NumberFormat value={totalImportPrice && totalImportPrice} displayType={'text'} thousandSeparator={true} prefix={'đ '} /></b></p>


                        <hr />
                        <h4 className="mt-4">Receipt Import Items: </h4>

                        {receiptItems && receiptItems.map(item => (
                            <Fragment>
                                <hr />
                                <div className="cart-item" key={item.product}>
                                    <div className="row">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="80" width="80" />
                                        </div>

                                        <div className="col-6 col-lg-6">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            <p><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'đ '} /></p>
                                        </div>


                                        <div className="col-2 col-lg-4 mt-4 mt-lg-0">
                                            <p>{item.quantity} x <NumberFormat value={item.importPrice} displayType={'text'} thousandSeparator={true} prefix={'đ '} /> = <b><NumberFormat value={(item.quantity * item.importPrice)} displayType={'text'} thousandSeparator={true} prefix={'đ '} /></b></p>
                                        </div>

                                    </div>
                                </div>
                                <hr />
                            </Fragment>
                        ))}


                    </Fragment>

                </div>
            </div>

        </Fragment>
    )
}

export default ReceiptDetails
