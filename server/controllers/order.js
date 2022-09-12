const { Order, CartItem } = require("../models/order");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
    // console.log("CREATE ORDER: ", req.body);
    req.body.order.user = req.profile // access model and assign user
    const order = new Order(req.body.order)
    order.save((error, data) => {
        if(error){
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.jons(data);
    });
};

exports.listOrders = (req, res) => {
    Order.find()
    .populate('user', '_id name address')
    .sort('-created')
    .exec((err, orders) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
    });
};

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
}