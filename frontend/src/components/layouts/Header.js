import React, { Fragment } from 'react'
import Search from './Search'
import { Route, Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'
import { CART_RESET } from '../../constants/cartConstants'

const Header = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { userLogin } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)
    const logoutHandler = () => {
        dispatch(logout())
        dispatch({ type: CART_RESET })
        alert.success('Logged out successfully.')
    }

    const categories = [
        'Balls',
        'Clothing',
        'Shoes'
    ]
    const brands = [
        'Adidas',
        'Nike',
        'Puma'
    ]

    return (
        <Fragment>
            <header>
                {/* mobile menu */}
                <div className="mobile-menu bg-gray">
                    <Link to="/" className="mb-logo">ToryoSport</Link>
                    <span className="mb-menu-toggle" id="mb-menu-toggle">
                        <i className="bx bx-menu" />
                    </span>
                </div>
                {/* end mobile menu */}
                {/* main header */}
                <div className="header-wrapper" id="header-wrapper">
                    <span className="mb-menu-toggle mb-menu-close" id="mb-menu-close">
                        <i className="bx bx-x" />
                    </span>
                    {/* top header */}
                    <div className="bg-gray">
                        <div className="top-header container">
                            <ul className="divided">
                                <li>
                                    <span>0986078827</span>
                                </li>
                                <li>
                                    <span>sport@toryo.com</span>
                                </li>
                            </ul>
                            <ul className="divided free-ship">
                                <li><strong>FREE DELIVERY: </strong>Get standard delivery on
                                    every order with Toryo Sport</li>
                            </ul>
                        </div>
                    </div>
                    {/* end top header */}
                    {/* mid header */}
                    <div className="bg-white">
                        <div className="mid-header container">
                            <Link to="/" className="logo">ToryoSport</Link>

                            <Route render={({ history }) => <Search history={history} />} />

                            <ul className="user-menu">
                                <li className="dropdown">

                                    {
                                        userLogin ? (
                                            <>
                                                <Link to="/profile">
                                                    <figure className="avatar">
                                                        <img
                                                            src={userLogin.avatar && userLogin.avatar.url}
                                                            alt={userLogin && userLogin.name}
                                                            className="rounded-circle"
                                                        />
                                                    </figure>
                                                    <span>{userLogin && userLogin.name}</span>
                                                </Link>
                                                <ul className="dropdown-content">
                                                    {userLogin && userLogin.role === 'admin' && (
                                                        <li><Link to="/dashboard">Dashboard</Link></li>
                                                    )}
                                                    <li><Link to="/profile">Profile</Link></li>
                                                    <li><Link to="/profile/orders">Order</Link></li>
                                                    <li><Link to="/" onClick={logoutHandler}>Logout</Link></li>
                                                </ul>
                                            </>
                                        ) : (
                                            <>
                                                <Link to="#"><i className="bx bx-user-circle" /></Link>
                                                <ul className="dropdown-content">
                                                    <li><Link to='/login'>Login</Link></li>
                                                    <li><Link to="/register">Register</Link></li>
                                                </ul>
                                            </>
                                        )
                                    }

                                </li>
                                <li className="header-cart">
                                    <Link to="/cart">
                                        <i className="bx bx-cart" />
                                        {
                                            cartItems ? <span>{cartItems.length}</span> : <span>0</span>
                                        }

                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* end mid header */}
                    {/* bottom header */}
                    <div className="bg-gray">
                        <div className="bottom-header container">
                            <ul className="main-menu">
                                <li><Link to="/">home</Link></li>
                                {/* mega menu */}
                                <li className="mega-dropdown">
                                    <Link to="/shop">Shop<i className="bx bxs-chevron-down" /></Link>
                                    <div className="mega-content">
                                        <div className="row">
                                            <div className="col-5">
                                                <div className="box">
                                                    <h3>Categories</h3>
                                                    <ul>
                                                        {
                                                            categories.map(category => (
                                                                <li><Link to={`/collections/category/${category}`}>{category}</Link></li>
                                                            ))
                                                        }

                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-5">
                                                <div className="box">
                                                    <h3>Brands</h3>
                                                    <ul>
                                                        {
                                                            brands.map(brand => (
                                                                <li><Link to={`/collections/brand/${brand}`}>{brand}</Link></li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                                {/* end mega menu */}
                                <li><Link to="/gallery">gallery</Link></li>
                                <li><Link to="/contact">contact</Link></li>
                            </ul>
                        </div>
                    </div>
                    {/* end bottom header */}
                </div>
                {/* end main header */}
            </header>
        </Fragment >
    )
}

export default Header
