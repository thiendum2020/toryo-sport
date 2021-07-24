import React from 'react'
import Adidas1 from '../assets/adidas-1.jpg'
import Adidas2 from '../assets/adidas-2.jpg'
import Nike1 from '../assets/nike-1.jpg'
import Nike2 from '../assets/nike-2.jpg'
import Puma2 from '../assets/puma-1.jpg'
import Puma1 from '../assets/puma-2.jpg'
import Gallery1 from '../assets/gallery-1.jpg'
import Gallery2 from '../assets/gallery-2.jpg'

const Gallery = () => {
    return (
        <section className="gallery">
            <div className="container">
                <h2 className="title">Gallery</h2>
                <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                <div className="row no-gutters">
                    <div className="col-lg-3 col-md-4">
                        <div className="gallery-item">
                            <img src={Adidas1} alt="" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4">
                        <div className="gallery-item">
                            <img src={Adidas2} alt="" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4">
                        <div className="gallery-item">
                            <img src={Nike1} alt="" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4">
                        <div className="gallery-item">
                            <img src={Nike2} alt="" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4">
                        <div className="gallery-item">
                            <img src={Puma1} alt="" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4">
                        <div className="gallery-item">
                            <img src={Puma2} alt="" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4">
                        <div className="gallery-item">
                            <img src={Gallery1} alt="" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4">
                        <div className="gallery-item">
                            <img src={Gallery2} alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Gallery
