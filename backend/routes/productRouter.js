const express = require('express')
const router = express.Router()

const {
    newProduct,
    getProducts,
    getFeaturedProducts,
    getHotProducts,
    getLatestProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReviews
} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.route('/products')
    .get(getProducts)
    .post(isAuthenticatedUser, authorizeRoles('admin'), newProduct)

router.route('/product/:id')
    .get(getSingleProduct)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

router.route('/products/featured').get(getFeaturedProducts)
router.route('/products/hot').get(getHotProducts)
router.route('/products/latest').get(getLatestProducts)

router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews')
    .get(isAuthenticatedUser, getProductReviews)
    .delete(isAuthenticatedUser, deleteReviews)

module.exports = router