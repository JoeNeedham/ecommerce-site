const express = require('express')
const app = express()
require('dotenv').config()
const connection = require("./db");
const userRoutes = require('./routes/user')
const morgan = require('morgan')
const bodyParser = require('body-parser'); // visual req.body in terminal
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator')


// database
connection()

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator())

// routes
app.use('/api',userRoutes);

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port! ${port}`)
});
