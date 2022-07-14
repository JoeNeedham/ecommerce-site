const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

module.exports = () => {
    const connectionParams = {
        useNewurlParser: true,
        useUnifiedTopology: true,
    }
    try {
        mongoose.connect(process.env.MONGO_URI, connectionParams);
        console.log("Connected to database sucessfully")
    } catch (error) {
        console.log(error);
        console.log("could not connect to database!")
    }
};