import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layouts/MetaData'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux'
import { getProductCollections } from '../../actions/productActions'
import Product from './Product'
import Loader from '../layouts/Loader'
import { useAlert } from 'react-alert'
import Pagination from "react-js-pagination"

const Collections = ({ match }) => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000000])
    const [rating, setRating] = useState(0)

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)
    const collections = match.params.collections
    const collection = match.params.collection

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProductCollections(currentPage, price, collections, collection))
    }, [dispatch, alert, error, currentPage, price, collections, collection])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productsCount
    if (filteredProductsCount <= productsCount && currentPage === 1) {
        count = filteredProductsCount
    }
    return (
        <Fragment>
            <MetaData title={'Shop'} />
            {/* shop */}
            <section className="shop">
                <div className="container">
                    <div className="shop-title">
                        <h2>Collections</h2>
                        <p>{collection} Collections</p>
                    </div>
                    {
                        loading ? <Loader /> : (
                            <>
                                <div className="row">
                                    <Fragment>
                                        <div className="col-3">

                                        </div>
                                    </Fragment>

                                    <Fragment>
                                        <div className="col-9">
                                            <div className="row">
                                                {
                                                    filteredProductsCount === 0 ? (
                                                        <div className="col-9">
                                                            <h3 className="empty">Products is empty</h3>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {
                                                                products && products.map(product => (
                                                                    <Product product={product} col={4} key={product._id} />
                                                                ))
                                                            }
                                                        </>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    </Fragment>
                                </div>
                                {
                                    resPerPage <= count && (

                                        <div className="product-pagination">
                                            <Pagination
                                                activePage={currentPage}
                                                itemsCountPerPage={resPerPage}
                                                totalItemsCount={productsCount}
                                                onChange={setCurrentPageNo}
                                                nextPageText={'Next'}
                                                prevPageText={'Prev'}
                                                firstPageText={'First'}
                                                lastPageText={'Last'}
                                                itemClass="page-item"
                                                linkClass="page-link"
                                            />
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </section>
        </Fragment>
    )
}

export default Collections
