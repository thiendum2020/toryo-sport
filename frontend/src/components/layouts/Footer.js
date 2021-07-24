import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <Fragment>
            {/* footer */}
            <div className="bg-gray">
                <footer>
                    <div className="container">
                        <div className="row footer" >
                            <div className="col-3">
                                <Link className="logo" to="/"><h3>ToryoSport</h3></Link>
                                <p>Affordable and Best Furnitures For Every Home</p>
                            </div>
                            <div className="col-3">
                                <h4>Help</h4>
                                <ul>
                                    <li><Link to="#">Plans</Link></li>
                                    <li><Link to="#">Track Order</Link></li>
                                    <li><Link to="#">Store Locator</Link></li>
                                    <li><Link to="#">Return Policy</Link></li>
                                    <li><Link to="#">My Account</Link></li>
                                </ul>
                            </div>
                            <div className="col-3">
                                <h4>About</h4>
                                <ul>
                                    <li><Link to="#">Our Story</Link></li>
                                    <li><Link to="#">Careers</Link></li>
                                    <li><Link to="#">Affiliate</Link></li>
                                    <li><Link to="#">Contact Us</Link></li>
                                </ul>
                            </div>
                            <div className="col-3">
                                <h4>Follow</h4>
                                <ul>
                                    <li><Link to="#">Facebook</Link></li>
                                    <li><Link to="#">Twitter</Link></li>
                                    <li><Link to="#">Instgram</Link></li>
                                    <li><Link to="#">YouTube</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            {/* end footer */}

        </Fragment>
    )
}

export default Footer
