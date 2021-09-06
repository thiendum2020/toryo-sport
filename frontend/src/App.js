import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ProtectedRoute from './components/route/ProtectedRoute'

import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import PageNotFound from './components/layouts/PageNotFound'

import Home from './components/Home'
import Shop from './components/Shop'
import Gallery from './components/Gallery'
import Contact from './components/Contact'

import ProductDetails from './components/product/ProductDetails'
import Collections from './components/product/Collections'

// Auth or User imports
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'

//Cart
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import OrderSuccess from './components/cart/OrderSuccess'
import Payment from './components/cart/Payment'

// Order Imports
import MyListOrders from './components/orders/MyListOrders'
import OrderDetails from './components/orders/OrderDetails'

// Admin Imports
import Dashboard from './components/admin/Dashboard'
import UsersList from './components/admin/UsersList'
import UpdateUser from './components/admin/UpdateUser'
import ProductsList from './components/admin/ProductsList'
import NewProduct from './components/admin/NewProduct'
import UpdateProduct from './components/admin/UpdateProduct'
import ProductReviews from './components/admin/ProductReviews'
import OrdersList from './components/admin/OrdersList'
import ProcessOrder from './components/admin/ProcessOrder'

import BrandsList from './components/admin/BrandsList'
import NewBrand from './components/admin/NewBrand'
import UpdateBrand from './components/admin/UpdateBrand'

import CategoriesList from './components/admin/CategoriesList'
import NewCategory from './components/admin/NewCategory'
import UpdateCategory from './components/admin/UpdateCategory'
function App() {

    return (
        <>
            <Router>
                <Header />
                <Route path="/page/404" component={PageNotFound} exact />

                <Route path="/" component={Home} exact />
                <Route path="/shop" component={Shop} exact />
                <Route path="/gallery" component={Gallery} exact />
                <Route path="/contact" component={Contact} exact />
                <Route path="/collections/:collections/:collection" component={Collections} />
                <Route path="/search/:keyword" component={Shop} />
                <Route path="/product/:id" component={ProductDetails} exact />

                <Route path="/cart" component={Cart} exact />
                <ProtectedRoute path="/order/shipping" component={Shipping} />
                <ProtectedRoute path="/order/confirm" component={ConfirmOrder} exact />
                <ProtectedRoute path="/order/payment" component={Payment} />
                <ProtectedRoute path="/order/success" component={OrderSuccess} />



                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/password/forgot" component={ForgotPassword} exact />

                <ProtectedRoute path="/profile" component={Profile} exact />
                <ProtectedRoute path="/profile/orders" component={MyListOrders} exact />
                <ProtectedRoute path="/profile/order/:id" component={OrderDetails} exact />
                <ProtectedRoute path="/profile/password/update" component={UpdatePassword} exact />

                <ProtectedRoute path="/admin/dashboard" isAdmin={true} component={Dashboard} exact />
                <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact />
                <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />
                <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact />
                <ProtectedRoute path="/admin/products/new" isAdmin={true} component={NewProduct} exact />
                <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />
                <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact />
                <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact />
                <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact />

                <ProtectedRoute path="/admin/brands" isAdmin={true} component={BrandsList} exact />
                <ProtectedRoute path="/admin/brands/new" isAdmin={true} component={NewBrand} exact />
                <ProtectedRoute path="/admin/brand/:id" isAdmin={true} component={UpdateBrand} exact />

                <ProtectedRoute path="/admin/categories" isAdmin={true} component={CategoriesList} exact />
                <ProtectedRoute path="/admin/categories/new" isAdmin={true} component={NewCategory} exact />
                <ProtectedRoute path="/admin/category/:id" isAdmin={true} component={UpdateCategory} exact />

                <Footer />

            </Router>

        </>
    );
}

export default App
