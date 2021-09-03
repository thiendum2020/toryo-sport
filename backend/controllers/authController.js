const User = require('../models/userModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const bcrypt = require('bcryptjs')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')

//Register a user   POST/api/register
exports.register = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password, avatar } = req.body

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: avatar ? avatar.public_id : 'nozomi-sasaki_fsnwsh',
            url: avatar ? avatar.url : 'https://res.cloudinary.com/toryobuyall/image/upload/v1624279409/Toryo-Buy-All/nozomi-sasaki_fsnwsh.jpg'
        }
    })

    // const token = user.getJwtToken()

    // res.status(200).json({
    //     success: true,
    //     token
    // })
    sendToken(user, 200, res)
})

//Login user   POST/api/login
exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body

    //Check email and password
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400))
    }

    const user = await User.findOne({ email })
    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    // const token = user.getJwtToken()

    // res.status(200).json({
    //     success: true,
    //     token
    // })
    sendToken(user, 200, res)
})

//Forgot password   POST/api/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }
    //Get reset token
    const resetToken = user.getResetPasswordToken()
    await user.save({ validateBeforeSave: false })

    //Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/password/reset/${resetToken}`

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, the ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'ToryoSport Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }
})

//Reset new password   PUT/api/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    //Hash url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    //Setup new password
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user, 200, res)
})

//Update / Change password      PUT/api/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    const isMatched = await bcrypt.compare(req.body.oldPassword, user.password)
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect', 400))
    }

    user.password = req.body.password
    await user.save()
    sendToken(user, 200, res)
})

//Update user profile      PUT/api/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    if (req.body.avatar) {
        newUserData.avatar = {
            public_id: req.body.avatar.public_id,
            url: req.body.avatar.url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

//Get currently logged in user details      GET/api/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

//Logout user   GET/api/logout 
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })

})

//Admin Routes

//Get all users     GET/api/admin/users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find().sort('-createdAt')

    res.status(200).json({
        success: true,
        count: users.length,
        users
    })
})

//Get user details     GET/api/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id).select('-password')

    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        user
    })
})

//Update user details     PUT/api/admin/user/:id
exports.updateUserDetails = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role

    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        user
    })
})

//Delete user details     DELETE/api/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404))
    }

    //Remove avatar from cloudinary

    await user.remove()
    res.status(200).json({
        success: true
    })
})

//Add to cart     PATCH/api/me/addtocart
exports.addToCart = catchAsyncErrors(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req.user.id}`, 404))
    }

    await Users.findOneAndUpdate({ _id: req.user.id }, {
        cart: req.body.cart
    })

    res.status(200).json({
        success: true,
        message: 'Add to cart successfully'
    })
})