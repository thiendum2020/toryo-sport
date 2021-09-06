import React, { Fragment, useState, useEffect } from 'react'
import MetaData from './layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './product/Product'
import Loader from './layouts/Loader'
import { useAlert } from 'react-alert'
import Pagination from "react-js-pagination"
import { getBrands } from '../actions/brandActions'
import { getCategories } from '../actions/categoryActions'

const Shop = ({ match, history }) => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 10000000])
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [rating, setRating] = useState(0)
    const { brands, loading: loadingBrand, error: errorBrand } = useSelector(state => state.brands)
    const { categories, loading: loadingCategories, error: errorCategories } = useSelector(state => state.categories)

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)
    const keyword = match.params.keyword

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProducts(keyword, currentPage, price, category, brand))

        if (errorBrand) {
            return alert.error(errorBrand)
        }
        dispatch(getBrands())
        if (errorCategories) {
            return alert.error(errorCategories)
        }
        dispatch(getCategories())
    }, [dispatch, alert, error, keyword, currentPage, price, category, brand, errorBrand, errorCategories])

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
                    <div className="shop-wrap">
                        <div className="shop-title">
                            <h2>Shop</h2>
                            <p>All Products</p>
                            <span>Total: {filteredProductsCount} products</span>
                        </div>
                        <div className="sort">
                            <select >
                                <option value="default">Default</option>
                                <option value="prices-asc">Prices asc</option>
                                <option value="prices-desc">Prices desc</option>
                                <option value="name-a-z">Name A - Z</option>
                                <option value="name-z-a">Name Z - A</option>
                            </select>

                        </div>
                    </div>

                    <div className="row">
                        <Fragment>
                            <div className="col-3 filter">
                                <h3>Categories</h3>
                                <ul>
                                    {categories && categories.map(category => (
                                        <li
                                            style={{
                                                cursor: 'pointer',
                                                listStyleType: 'none'
                                            }}
                                            key={category._id}
                                            onClick={() => setCategory(category.name)}>
                                            {category.name}
                                        </li>
                                    ))}
                                    <li
                                        style={{
                                            cursor: 'pointer',
                                            listStyleType: 'none'
                                        }}
                                        onClick={() => setCategory('')}>Clear</li>
                                </ul>
                                <hr className="my-5" />
                                <h3>Brands</h3>
                                <ul>
                                    {brands && brands.map(brand => (
                                        <li
                                            style={{
                                                cursor: 'pointer',
                                                listStyleType: 'none'
                                            }}
                                            key={brand._id}
                                            onClick={() => setBrand(brand.name)}>
                                            {brand.name}
                                        </li>
                                    ))}
                                    <li
                                        style={{
                                            cursor: 'pointer',
                                            listStyleType: 'none'
                                        }}
                                        onClick={() => setBrand('')}>Clear</li>
                                </ul>
                            </div>
                        </Fragment>
                        {
                            loading ? <Loader /> : (
                                <Fragment>
                                    <div className="col-9">

                                        {
                                            brand && category ? <h4>Tags: {brand}, {category}</h4>
                                                : brand ? <h4>Tags: {brand}</h4> : category ? <h4>Tags: {category}</h4> : null
                                        }
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
                                                                <Product product={product} col={4} key={product._id} history={history} />
                                                            ))
                                                        }
                                                    </>
                                                )
                                            }

                                        </div>
                                        {
                                            resPerPage <= count && (

                                                <div className="product-pagination">
                                                    <Pagination
                                                        activePage={currentPage}
                                                        itemsCountPerPage={resPerPage}
                                                        totalItemsCount={filteredProductsCount}
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
                                    </div>

                                </Fragment>

                            )
                        }
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Shop
