const express = require('express')
const app = express()
require('dotenv').config()
const connection = require("./db");
const userRoutes = require('./routes/user')
const morgan = require('morgan')
const bodyParser = require('body-parser'); // visual req.body in terminal
const cookieParser = require('cookie-parser');
// database
connection()

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.use('/api',userRoutes);

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port! ${port}`)
});

// "use strict";

// /**
//  * Get unique error field name
//  */
// const uniqueMessage = error => {
//     let output;
//     try {
//         let fieldName = error.message.substring(
//             error.message.lastIndexOf(".$") + 2,
//             error.message.lastIndexOf("_1")
//         );
//         output =
//             fieldName.charAt(0).toUpperCase() +
//             fieldName.slice(1) +
//             " already exists";
//     } catch (ex) {
//         output = "Unique field already exists";
//     }

//     return output;
// };

/**
 * Get the erroror message from error object
 */
// exports.errorHandler = error => {
//     let message = "";

//     if (error.code) {
//         switch (error.code) {
//             case 11000:
//             case 11001:
//                 message = uniqueMessage(error);
//                 break;
//             default:
//                 message = "Something went wrong";
//         }
//     } else {
//         for (let errorName in error.errorors) {
//             if (error.errorors[errorName].message)
//                 message = error.errorors[errorName].message;
//         }
//     }

//     return message;
// };