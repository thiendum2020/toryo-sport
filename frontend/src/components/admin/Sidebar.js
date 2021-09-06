import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/admin/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li>
                    <li>
                        <Link to="/admin/products"><i className="fa fa-clipboard"></i> Products</Link>
                    </li>
                    <li>
                        <Link to="/admin/brands"><i class="fas fa-band-aid"></i> Brands</Link>
                    </li>
                    <li>
                        <Link to="/admin/categories"><i class="fas fa-bacteria"></i> Categories</Link>
                    </li>
                    <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                    </li>
                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
