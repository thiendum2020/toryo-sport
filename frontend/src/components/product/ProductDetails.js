import React, { Fragment, useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors } from '../../actions/productActions'
import { addItemToCart } from '../../actions/cartActions'

const ProductDetails = ({ match }) => {
    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, error, product } = useSelector(state => state.productDetails)

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        // if (reviewError) {
        //     alert.error(reviewError);
        //     dispatch(clearErrors())
        // }

        // if (success) {
        //     alert.success('Reivew posted successfully')
        //     dispatch({ type: NEW_REVIEW_RESET })
        // }

    }, [dispatch, alert, error, match.params.id])

    const increaseQty = () => {
        const count = document.querySelector('.product-quantity')

        if (count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const decreaseQty = () => {

        const count = document.querySelector('.product-quantity')

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty)

    }

    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity));
        alert.success('Item Added to Cart')
    }

    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', match.params.id);
    }

    return (
        <>
            <MetaData title={product.name} />
            {/* shop */}
            {
                loading ? <Loader /> : (
                    <Fragment>
                        <section className="product">
                            <div className="container">
                                <div className="product-title">
                                    <h2><Link to='/shop'>Shop</Link></h2>
                                    <p>Product Details</p>
                                </div>
                                <div className="product-details">
                                    <div className="row">
                                        <div className="col-5">
                                            <Carousel pause='hover'>
                                                {product.image && product.image.map(image => (
                                                    <Carousel.Item key={image.public_id}>
                                                        <img className="d-block w-100" src={image.url} alt={product.title} />
                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>
                                        </div>
                                        <div className="col-7">
                                            <h2>{product.name}</h2>
                                            <div className="product-details-info">
                                                <span>Brand: </span>
                                                <a href="#">{product.brand}</a>
                                            </div>
                                            <div className="product-details-info">
                                                <span>Category: </span>
                                                <a href="#">{product.category}</a>
                                            </div>
                                            <div className="product-details-info">
                                                <div className="ratings">
                                                    <div className="rating-outer">
                                                        <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                                                    </div>
                                                    <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                                                </div>
                                            </div>
                                            <div className="product-details-info">
                                                <span>Status: </span>
                                                <p className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                                            </div>
                                            <div className="product-details-descriptions">
                                                <p>{product.description}</p>
                                            </div>
                                            <div className="product-details-info">
                                                <h3>${product.price}</h3>
                                            </div>
                                            <div className="product-quantity-wrapper">
                                                <span className="product-quantity-btn" onClick={decreaseQty}>
                                                    <i className="bx bx-minus"></i>
                                                </span>
                                                <input type="number" className="product-quantity" value={quantity} readOnly />
                                                <span className="product-quantity-btn" onClick={increaseQty}>
                                                    <i className="bx bx-plus"></i>
                                                </span>
                                                <button type="button" className="btn-cart" disabled={product.stock === 0} onClick={addToCart}>Add to cart</button>
                                            </div>


                                            <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                                Submit Your Review
                                            </button>

                                            <div className="row mt-2 mb-5">
                                                <div className="rating w-50">

                                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog" role="document">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body">

                                                                    <ul className="stars" >
                                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                                    </ul>

                                                                    <textarea
                                                                        name="review"
                                                                        id="review" className="form-control mt-3"
                                                                        value={comment}
                                                                        onChange={(e) => setComment(e.target.value)}
                                                                    >

                                                                    </textarea>

                                                                    <button className="btn my-3 float-right review-btn px-4 text-white" onClick={reviewHandler} data-dismiss="modal" aria-label="Close">Submit</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </section>
                    </Fragment >
                )
            }
        </>
    )
}

export default ProductDetails
