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
    updateStockProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReviews,
    getAdminProducts,
    getHotProductsByAdmin

} = require('../controllers/productController')
const {
    hotProductBetween
} = require('../controllers/orderController')

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.route('/products')
    .get(getProducts)

router.route('/product/:id')
    .get(getSingleProduct)

router.route('/product/stock/:id').put(isAuthenticatedUser, updateStockProduct)

router.route('/products/featured').get(getFeaturedProducts)
router.route('/products/hot').get(getHotProducts)
router.route('/products/latest').get(getLatestProducts)

router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews')
    .get(isAuthenticatedUser, getProductReviews)
    .delete(isAuthenticatedUser, deleteReviews)

//Admin    
router.route('/admin/products').get(getAdminProducts)
router.route('/admin/products/charts').post(isAuthenticatedUser, authorizeRoles('admin'), hotProductBetween)
router.route('/admin/products/chart').post(isAuthenticatedUser, authorizeRoles('admin'), getHotProductsByAdmin)
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct)
router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)


module.exports = router