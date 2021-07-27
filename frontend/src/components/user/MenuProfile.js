import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const MenuProfile = () => {
    return (
        <Fragment>
            <div className="menu-profile">
                <h5><i class='bx bxs-user-pin'></i><Link to="/profile">My Profile</Link></h5>
                <ul>
                    <li><Link to="/profile">Profile</Link></li>
                    <li> <Link to="/profile/password/update">Change Password</Link></li>
                </ul>
                <h5><i class='bx bxs-receipt'></i><Link to="/profile/orders">My orders</Link></h5>
            </div>
        </Fragment>
    )
}

export default MenuProfile
