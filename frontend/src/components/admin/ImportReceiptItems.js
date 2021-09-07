import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'
import swal from 'sweetalert'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateItem, removeItem, saveSupplierInfo } from '../../actions/receiptAction'

const ImportReceiptItems = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const { importReceiptItems, supplierInfo } = useSelector(state => state.importReceipt)

    const [name, setName] = useState(supplierInfo.name)
    const [address, setAddress] = useState(supplierInfo.address)
    const [country, setCountry] = useState(supplierInfo.country)
    const [phone, setPhone] = useState(supplierInfo.phone)

    const increaseQty = (id, quantity, importPrice) => {
        const newQty = quantity + 1;
        dispatch(updateItem(id, newQty, importPrice))
    }

    const decreaseQty = (id, quantity, importPrice) => {
        const newQty = quantity - 1;
        if (newQty <= 0) return
        dispatch(updateItem(id, newQty, importPrice))
    }

    const removeItemHandler = (id) => {
        console.log(id);
        dispatch(removeItem(id))
    }
    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveSupplierInfo({ name, address, phone, country }))
        history.push('/admin/receipts/confirm')
    }
    return (
        <Fragment>
            <MetaData title={'Admin - All Import Receipt Items'} />
            <div className="row admin-products">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="users-list-header my-4">
                            <h3>All Import Receipt Items (Total: {importReceiptItems && importReceiptItems.length})</h3>
                        </div>

                        {
                            importReceiptItems ? (
                                <>
                                    {
                                        importReceiptItems.length === 0 ? null : (
                                            <Fragment>
                                                <div className="container cart">

                                                    <div class="row">
                                                        <div className="col-9">
                                                            <table>
                                                                <tbody>
                                                                    <tr className="table-header">
                                                                        <th><b>Product</b></th>
                                                                        <th><b>Stock</b></th>
                                                                        <th style={{ paddingLeft: "20px" }}><b>Quantity</b></th>
                                                                        <th><b>Import Price</b></th>
                                                                        <th></th>
                                                                    </tr>
                                                                    {
                                                                        importReceiptItems.map(item => (
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
                                                                                            <p>Price: ${item.price}</p>
                                                                                            <span onClick={() => removeItemHandler(item.product)} >Remove</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    {item.stock}
                                                                                </td>

                                                                                <td style={{ textAlign: "center" }}>
                                                                                    <div className="product-quantity-wrapper">
                                                                                        <span className="product-quantity-btn" onClick={() => decreaseQty(item.product, item.quantity, item.importPrice)}>
                                                                                            <i className="bx bx-minus"></i>
                                                                                        </span>
                                                                                        <input type="number" className="product-quantity" value={item.quantity} readOnly />
                                                                                        <span className="product-quantity-btn" onClick={() => increaseQty(item.product, item.quantity, item.importPrice)}>
                                                                                            <i className="bx bx-plus"></i>
                                                                                        </span>

                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <input
                                                                                        type="number"
                                                                                        id="price_field"
                                                                                        className="form-control"
                                                                                        style={{ width: '25%' }}
                                                                                        value={item.importPrice}
                                                                                        onChange={(e) => dispatch(updateItem(item.product, item.quantity, e.target.value))}
                                                                                    />
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="col-3">
                                                            <h4>Supplier</h4>
                                                            <form className="" onSubmit={submitHandler} encType='multipart/form-data'>
                                                                <div className="form-group">
                                                                    <label htmlFor="name_field">Name</label>
                                                                    <input
                                                                        type="text"
                                                                        id="name_field"
                                                                        className="form-control"
                                                                        value={name}
                                                                        onChange={(e) => setName(e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="name_field">Address</label>
                                                                    <input
                                                                        type="text"
                                                                        id="name_field"
                                                                        className="form-control"
                                                                        value={address}
                                                                        onChange={(e) => setAddress(e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="name_field">Phone</label>
                                                                    <input
                                                                        type="text"
                                                                        id="name_field"
                                                                        className="form-control"
                                                                        value={phone}
                                                                        onChange={(e) => setPhone(e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="name_field">Country</label>
                                                                    <input
                                                                        type="text"
                                                                        id="name_field"
                                                                        className="form-control"
                                                                        value={country}
                                                                        onChange={(e) => setCountry(e.target.value)}
                                                                    />
                                                                </div>
                                                                <button
                                                                    id="shipping_btn"
                                                                    type="submit"
                                                                    className="btn btn-block py-3">
                                                                    Make an entry ticket
                                                                </button>
                                                            </form>

                                                        </div>
                                                    </div>

                                                </div>

                                            </Fragment>
                                        )
                                    }
                                </>
                            ) : null
                        }

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ImportReceiptItems
