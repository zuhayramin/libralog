// We are checking if we are in production or not
// While we are testing locally, we want our server to use the .env file we created locally
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
// We don't want to hardcode our database url, we want it to be dependant on our environment.
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to Mongoose"))

// This is getting our index.js file from the 'routes' folder
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

// The view engine facilitates the combining of data from the server with templates, before being sent to the client
app.set('view engine', 'ejs')
// This just tells our code where to find the views
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))


app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

// This will pull the PORT from the environment variable. When we deploy, the server will tell us which port it is listening to, not us
// For development, we will just use the PORT 3000
app.listen(process.env.PORT || 3000)