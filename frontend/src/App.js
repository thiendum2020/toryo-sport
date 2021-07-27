import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ProtectedRoute from './components/route/ProtectedRoute'

import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'

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

function App() {
    return (
        <Router>
            <Header />

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

            <Footer />
        </Router>
    );
}

export default App
