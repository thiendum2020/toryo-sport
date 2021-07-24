import React from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../../actions/cartActions'
const Product = ({ product, col }) => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const addToCart = () => {
        dispatch(addItemToCart(product._id, 1));
        alert.success('Item Added to Cart')
    }

    return (
        <div className={`col-${col} product-item`}>
            <div className="product-img">
                <a href={`/product/${product._id}`}>
                    <img src={product.image[0].url} alt={product.name} />
                </a>
                <div className="product-action">
                    <i className='bx bxs-cart-add' onClick={addToCart}></i>
                    <Link to={`/product/${product._id}`}><i className='bx bx-show'></i></Link>
                </div>
            </div>
            <Link to={`/product/${product._id}`}><h4>{product.name}</h4></Link>

            <div className="ratings">
                <div className="rating-outer">
                    <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                </div>
                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
            </div>
            <p>${product.price}</p>
        </div>
    )
}

export default Product
