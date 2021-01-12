// Import Models.
const User = require("../models/user");
const {Order} = require("../models/order");

// Import utils.
const {BadRequest} = require("../utils/errors");

/**
 * Get user by id param middleware.
 */
exports.getUserById = (request, response, next, id) => {
    User.findById(id).exec((error, user) => {
      if (error || !user) {
        let error = new BadRequest("Invalid User Id.");
        return next(error);
      }
      // Create a request property and attach user data.
      request.profile = user;
  
      // Remove salt and password from request profile for security.
      request.profile.salt = undefined;
      request.profile.encryp_password = undefined;
      request.profile.createdAt = undefined;
      request.profile.updatedAt = undefined;
      next();
    });
};

exports.getUser = (request, response) => {
  console.log("INSIDE GET USER !")
  return response.json(request.profile);
};

/**
 * Update user info.
 */
exports.updateUser = (request, response) => {
  User.findByIdAndUpdate(
    { _id: request.profile._id },
    { $set: request.body },
    { new: true, useFindAndModify: false },
    (error, user) => {
      if (error) {
        return response.status(400).json({
          message: "UNABLE TO UPDATE USER INFO",
        });
      }
      // Remove salt and password from request profile for security.
      user.salt = undefined;
      user.encryp_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      response.json(user);
    }
  );
};

/**
 * Returns User Purchase List
 */
exports.userPurchaseList = (request,response) => {
   Order.find({user:request.profile._id})
   .populate("user","_id name")
   .exec((error,order) => {
       if(error) {
           return response.status(400).json({
               message: "UNABLE TO FIND ORDER"
           })
       }
       return response.json(order);
   })
}

/**
 * Push Order In Purchase List.
 */
exports.pushOrderInPurchaseList = (request,response,next) => {
    let purchases = []
    request.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: request.body.order.amount,
            transaction_id: request.body.order.transaction_id
        })
    });

    User.findByIdAndUpdate(
        {_id:request.profile._id},
        {$push:{purchases:purchases}},
        {new:true}, // true flag returns the updated object.
        (error,purchase) => {
            if(error) {
                return response.status(400).json({
                    message: "UNABLE TO SAVE PURCHASE LIST."
                })
            }
            next();
        }
    )
}