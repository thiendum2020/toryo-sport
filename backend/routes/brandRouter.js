const express = require('express')
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

const {
    newBrand,
    getBrands,
    getBrandById,
    getBrandByName,
    updateBrand,
    deleteBrand
} = require('../controllers/brandController')


router.route('/brands')
    .get(getBrands)
router.route('/brand/:id')
    .get(getBrandById)

router.route('/brand/name/:name')
    .get(getBrandByName)
router.route('/admin/brand/new')
    .post(isAuthenticatedUser, authorizeRoles('admin'), newBrand)
router.route('/admin/brand/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateBrand)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBrand)
module.exports = router
