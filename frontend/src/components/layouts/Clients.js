import React from 'react'
import Client1 from '../../assets/client-1.png'
import Client2 from '../../assets/client-2.png'
import Client3 from '../../assets/client-3.png'
import Client4 from '../../assets/client-4.png'
import Client5 from '../../assets/client-5.png'
import Client6 from '../../assets/client-6.png'
import Client7 from '../../assets/client-7.png'
import Client8 from '../../assets/client-8.png'

const Clients = () => {
    return (
        <section className="clients">
            <div className="container">
                <h2 className="title">Clients</h2>
                <div className="row no-gutters clients-wrap clearfix wow fadeInUp">
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="client-logo">
                            <img src={Client1} className="img-fluid" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="client-logo">
                            <img src={Client2} className="img-fluid" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="client-logo">
                            <img src={Client3} className="img-fluid" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="client-logo">
                            <img src={Client4} className="img-fluid" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="client-logo">
                            <img src={Client5} className="img-fluid" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="client-logo">
                            <img src={Client6} className="img-fluid" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="client-logo">
                            <img src={Client7} className="img-fluid" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="client-logo">
                            <img src={Client8} className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>


    )
}

export default Clients
