import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFeaturedProducts, getLatestProducts } from '../actions/productActions'
import Product from './product/Product'
import Loader from './layouts/Loader'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import Banner from '../assets/banner.png'
import Adidas from '../assets/adidas.jpg'
import Nike from '../assets/nike.jpg'
import Puma from '../assets/puma.jpg'
import MetaData from './layouts/MetaData'
import Services from './layouts/Services'
import Clients from './layouts/Clients'

const Home = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loadingF, featuredProducts, errorF } = useSelector(state => state.featuredProducts)
    const { loadingL, latestProducts, errorL } = useSelector(state => state.latestProducts)

    useEffect(() => {
        if (errorF) {
            return alert.error(errorF)
        }
        dispatch(getFeaturedProducts())
        if (errorL) {
            return alert.error(errorF)
        }
        dispatch(getLatestProducts())
    }, [dispatch, alert, errorF, errorL])


    return (
        <Fragment>
            <MetaData title={'Buy All'} />
            {/* banner */}
            <section className="hero">
                <div className="container">
                    <div className="row">
                        <div className="hero-info col-6">
                            <h5 className="timeless">Timeless</h5>
                            <h1>Toryo Designs</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam consequatur quia ipsam sint
                                voluptatibus assumenda tenetur laborum praesentium! Tenetur, repellendus.</p>
                            <a href className="btn">Explore Now</a>
                        </div>
                        <div className="hero-image col-6">
                            <img src={Banner} alt="Banner" />
                        </div>
                    </div>
                </div>
            </section>
            {/* categories collection */}
            <section className="categories">
                <h2 class="title">Brands Collection</h2>
                <div className="small-container">
                    <div className="row">
                        <div className="col-4 category">
                            <Link to="/collections/brand/Adidas" className="category-wrap">
                                <img src={Adidas} className="category-img" alt="Adidas" />
                                <div className="category-info">
                                    <h4>Adidas</h4>
                                    <div className="category-links">
                                        <Link to="/collections/brand/Adidas" title="More Details"><i className="bx bx-search" /></Link>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-4 category">
                            <Link to="/collections/brand/Nike" className="category-wrap">
                                <img src={Nike} className="category-img" alt="Nike" />
                                <div className="category-info">
                                    <h4>Nike</h4>
                                    <div className="category-links">
                                        <Link to="/collections/brand/Nike" title="More Details"><i className="bx bx-search" /></Link>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-4 category">
                            <Link to="/collections/brand/Puma" className="category-wrap">
                                <img src={Puma} className="category-img" alt="Puma" />
                                <div className="category-info">
                                    <h4>Puma</h4>
                                    <div className="category-links">
                                        <Link to="/collections/brand/Puma" title="More Details"><i className="bx bx-search" /></Link>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* featured collection */}
            <section className="featured">
                <div className="container">
                    <div className="featured-title">
                        <h2>Featured</h2>
                        <p>Featured Products</p>
                    </div>
                    {
                        loadingF ? <Loader /> : (
                            <div className="row">
                                {
                                    featuredProducts && featuredProducts.map(product => (
                                        <Product product={product} col={3} key={product._id} />
                                    ))
                                }
                            </div>
                        )
                    }

                </div>
            </section>
            {/* latest collection */}
            <section className="latest">
                <div className="container">
                    <div className="latest-title">
                        <h2>latest</h2>
                        <p>Latest Products</p>
                    </div>
                    {
                        loadingL ? <Loader /> : (
                            <div className="row">
                                {
                                    latestProducts && latestProducts.map(product => (
                                        <Product product={product} col={3} key={product._id} />
                                    ))
                                }
                            </div>
                        )
                    }

                </div>
            </section>

            {/* services */}
            <Services />

            {/* clients */}
            <Clients />
        </Fragment>
    )
}

export default Home
