const { Order, ProductInOrder } = require("../models/order");

/**
 * GET PRODUCT BY ID.
 */
exports.getOrderById = (request, response, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((error, order) => {
      if (error) {
        return response.status(400).json({
          message: "UNABLE TO FIND ORDER",
        });
      }
      request.order = order;
      next();
    });
};

/**
 * CREATE ORDER.
 */
exports.createOrder = (request, response) => {
  request.body.order.user = req.profile;
  const order = new Order(request.body);
  order.save((error, order) => {
    if (error) {
      return response.status(400).json({
        message: "UNABLE TO CREATE ORDER",
      });
    }
    response.json(order);
  });
};

/**
 * Get All Order
 */
exports.getAllOrders = (request, response) => {
  Order.find()
    .populate("user", "_id name email")
    .exec((error, orders) => {
      if (error) {
        return response.status(400).json({
          message: "UNABLE TO GET ORDERS",
        });
      }
      response.json({
        orders: orders,
      });
    });
};


exports.getOrdersStatus = (request,response) => {

    response.json(Order.schema.path("status").enumValues);
}

exports.updateStatus = (request,response) => {

    Order.findByIdAndUpdate(
        {_id: request.body._id},
        {$set: {status: request.body.status}},
        (error,order) => {
            if(error) {
                return response.status(400).json({
                    message: "UNABLE TO UPDATE STATUS"
                })
            }
            response.json(order);
        }

    )
}
