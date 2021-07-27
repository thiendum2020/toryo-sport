const express = require('express')
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const {
    newOrder,
    getSingleOrder,
    getMyOrders,
    getAllOrdersByAdmin,
    updateOrdersByAdmin,
    updateStatusOrder,
    deleteOrder
} = require('../controllers/orderController')

router.route('/order/new')
    .post(isAuthenticatedUser, newOrder)
router.route('/order/:id')
    .get(isAuthenticatedUser, getSingleOrder)
    .put(isAuthenticatedUser, updateStatusOrder)
router.route('/orders/me')
    .get(isAuthenticatedUser, getMyOrders)
router.route('/admin/orders')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrdersByAdmin)
router.route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrdersByAdmin)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder)

module.exports = router