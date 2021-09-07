import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'
import { Bar } from "react-chartjs-2"

import { useDispatch, useSelector } from 'react-redux'

import { getAdminProducts, getHotProductsByAdmin } from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { allUsers } from '../../actions/userActions'
import { getBrands } from '../../actions/brandActions'
import { getCategories } from '../../actions/categoryActions'
import { allReceipts } from '../../actions/receiptAction'

const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)
    const { hotProductsByAdmin } = useSelector(state => state.hotProductsByAdmin)
    const { users } = useSelector(state => state.allUsers)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)
    const { brands } = useSelector(state => state.brands)
    const { categories } = useSelector(state => state.categories)
    const { receipts } = useSelector(state => state.allReceipts)
    const { importReceiptItems } = useSelector(state => state.importReceipt)
    // let outOfStock = 0;
    // products && products.forEach(product => {
    //     if (product.stock === 0) {
    //         outOfStock += 1;
    //     }
    // })

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(getHotProductsByAdmin())
        dispatch(allOrders())
        dispatch(allUsers())
        dispatch(getBrands())
        dispatch(getCategories())
        dispatch(allReceipts())
    }, [dispatch])
    const names = hotProductsByAdmin && hotProductsByAdmin.map(product => product.name.slice(0, 20));
    const solds = hotProductsByAdmin && hotProductsByAdmin.map(product => product.sold);

    return (
        <Fragment>
            <div className="row admin-dashboard">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10" style={{ paddingBottom: '40px' }}>
                    <h4 className="my-4">Dashboard</h4>

                    {loading ? <Loader /> : (
                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />

                            <div className="row pr-4">

                                <Link to='/admin/products' className="col-xl-6 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Products</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{products && products.length}</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-calendar fa-2x text-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link to='#' className="col-xl-6 col-md-6 mb-4">
                                    <div className="card border-left-success shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        Total Amount</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">${totalAmount && totalAmount}</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link to='/admin/users' className="col-xl-6 col-md-6 mb-4">
                                    <div className="card border-left-warning shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        Users</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{users && users.length}</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-users fa-2x text-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link to='/admin/orders' className="col-xl-6 col-md-6 mb-4">
                                    <div className="card border-left-info shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                        Orders</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{orders && orders.length}</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link to='/admin/brands' className="col-xl-6 col-md-6 mb-4">
                                    <div className="card border-left-orange shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                        Brands</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{brands && brands.length}</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-band-aid fa-2x text-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link to='/admin/categories' className="col-xl-6 col-md-6 mb-4">
                                    <div className="card border-left-purple shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                        Categories</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{categories && categories.length}</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-bacteria fa-2x text-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link to='/admin/receipts' className="col-xl-6 col-md-6 mb-4">
                                    <div className="card border-left-purple shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                        Receipts</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{receipts && receipts.length}</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-bacteria fa-2x text-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link to='/admin/receipts/import' className="col-xl-6 col-md-6 mb-4">
                                    <div className="card border-left-purple shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                        Import Receipt ItemsPrice</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{importReceiptItems && importReceiptItems.length}</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-bacteria fa-2x text-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            </div>

                            <h4 className="my-4">Top 10 Best-Selling Products</h4>

                            <Bar
                                data={{
                                    labels: names,
                                    datasets: [
                                        {
                                            label: "Sold",
                                            backgroundColor: [
                                                "#3e95cd",
                                                "#8e5ea2",
                                                "#3cba9f",
                                                "#e8c3b9",
                                                "#c45850",
                                                "#FFCC99",
                                                "#99CCCC",
                                                "#FF99CC",
                                                "#FF6600",
                                                "#993399",
                                            ],
                                            data: solds
                                        }
                                    ]
                                }}
                                options={{
                                    legend: { display: false },
                                    title: {
                                        display: true,
                                        text: "Predicted world population (millions) in 2050"
                                    }
                                }}
                            />

                        </Fragment>
                    )}

                </div>
            </div>

        </Fragment >
    )
}

export default Dashboard
