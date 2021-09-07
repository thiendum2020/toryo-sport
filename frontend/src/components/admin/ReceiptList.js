import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allReceipts } from '../../actions/receiptAction'

const ReceiptList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, receipts } = useSelector(state => state.allReceipts);

    useEffect(() => {
        dispatch(allReceipts())
    }, [dispatch, alert])


    const setReceipts = () => {
        const data = {
            columns: [
                {
                    label: 'Receipt ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Created At',
                    field: 'createdAt',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Total Import Price',
                    field: 'totalImportPrice',
                    sort: 'asc'
                },

                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        receipts && receipts.forEach(receipt => {
            data.rows.push({
                id: receipt._id,
                createdAt: String(receipt.createdAt).substring(0, 10),
                user: receipt.user,
                totalImportPrice: `${receipt.totalImportPrice}`,

                actions:
                    <Link to={`/admin/receipt/${receipt._id}`} className="btn-order-details" style={{ paddingLeft: '16px' }}>
                        <i className="fa fa-eye"></i>
                    </Link>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'All Receipts'} />
            <div className="row admin-orders">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="users-list-header my-4">
                            <h3>All Receipts (Total: {receipts && receipts.length})</h3>
                        </div>

                        {loading ? <Loader /> : (
                            <MDBDataTableV5
                                data={setReceipts()}
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

export default ReceiptList
