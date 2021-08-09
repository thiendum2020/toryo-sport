const express = require('express')
const app = express()
const errorMiddleware = require('./middleware/errors')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

// Setting up config file 
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

//Import all routes
const products = require('./routes/productRouter')
const auth = require('./routes/authRouter')
const order = require('./routes/orderRouter')


app.use('/api/', products)
app.use('/api/', auth)
app.use('/api/', order)
app.use('/api/', require('./routes/upload'))

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

//Middleware to handle error
app.use(errorMiddleware)


module.exports = app