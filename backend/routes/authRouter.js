const express = require('express')
const router = express.Router()

const {
    register,
    login,
    getUserProfile,
    logout,
    forgotPassword,
    resetPassword,
    updatePassword,
    updateProfile,
    getAllUsers,
    getUserDetails,
    updateUserDetails,
    deleteUser,
    addToCart
} = require('../controllers/authController')

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/me').get(isAuthenticatedUser, getUserProfile)
router.route('/logout').get(logout)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/password/update').put(isAuthenticatedUser, updatePassword)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)

router.route('/me/addtocart').patch(isAuthenticatedUser, addToCart)


//Admin Routes
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers)
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUserDetails)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)


module.exports = router