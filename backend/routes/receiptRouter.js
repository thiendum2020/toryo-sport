const express = require('express')
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

const {
    newReceipt,
    getAllReceipts,
    getReceipt,

} = require('../controllers/receiptController')

router.route('/admin/receipt/new')
    .post(isAuthenticatedUser, authorizeRoles('admin'), newReceipt)
router.route('/admin/receipts')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAllReceipts)
router.route('/admin/receipt/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getReceipt)

module.exports = router