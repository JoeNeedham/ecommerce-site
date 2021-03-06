const express = require('express');
const app = express();
require('dotenv').config()
const connection = require("./db");
const userRoutes = require('./routes/auth');
const authRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const morgan = require('morgan')
const bodyParser = require('body-parser'); // visual req.body in terminal
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');


// database
connection()

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator())
app.use(cors());

// routes
app.use('/api',userRoutes);
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);


const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port! ${port}`)
});
