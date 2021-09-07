import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'
import swal from 'sweetalert'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { createReceipt } from '../../actions/receiptAction'
import { RECEIPT_RESET } from '../../constants/receiptConstants'

const ConfirmReceipt = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { importReceiptItems, supplierInfo } = useSelector(state => state.importReceipt)

    const totalImportPrice = importReceiptItems.reduce((acc, item) => acc + item.importPrice * item.quantity, 0)

    const receipt = {
        receiptItems: importReceiptItems,
        totalImportPrice,
        supplierInfo
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    try {

                        dispatch(createReceipt(receipt))
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        })
                        dispatch({ type: RECEIPT_RESET })
                        history.push('/admin/receipts')

                    } catch (error) {
                        alert.error(error.response.data.message)
                    }
                } else {
                    history.push('/admin/receipts/import')
                }
            })
    }

    return (
        <Fragment>

            <MetaData title={'Confirm Order'} />
            <div className="row admin-products">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>

                        <div class="row" style={{ paddingTop: '60px' }}>
                            <div className="col-8">

                                <h4 className="mb-3" >Shipping Info</h4>
                                <p><b>Name: </b> {supplierInfo.name}</p>
                                <p><b>Phone: </b> {supplierInfo.phone}</p>
                                <p><b>Address: </b> {supplierInfo.address}</p>
                                <p><b>Country: </b> {supplierInfo.country}</p>
                            </div>
                            <div className="col-4">
                                <div id="order_summary">
                                    <h4>Order Summary</h4>
                                    <hr />
                                    <p>Subtotal:  <span className="order-summary-values">${totalImportPrice}</span></p>

                                    <button id="checkout_btn" className="btn btn-block btn-order-summary" onClick={submitHandler}>Payment</button>
                                </div>
                            </div>
                        </div>



                        <hr />
                        <h4 className="mt-4">Receipt Import Items: </h4>

                        {importReceiptItems.map(item => (
                            <Fragment>
                                <hr />
                                <div className="cart-item" key={item.product}>
                                    <div className="row">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="80" width="80" />
                                        </div>

                                        <div className="col-6 col-lg-6">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            <p>Price: {item.price}</p>
                                        </div>


                                        <div className="col-2 col-lg-4 mt-4 mt-lg-0">
                                            <p>{item.quantity} x ${item.importPrice} = <b>${(item.quantity * item.importPrice)}</b></p>
                                        </div>

                                    </div>
                                </div>
                                <hr />
                            </Fragment>
                        ))}

                    </Fragment>
                </div>
            </div>
        </Fragment >
    )
}

export default ConfirmReceipt
