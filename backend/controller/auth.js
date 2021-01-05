const User = require("../models/user");

module.exports.signup = (request, response) => {
    console.log(request.body)
  const user = new User(request.body);
  user.save((error, data) => {
    if (error) {
      console.log("Something Went Wrong.");
    }
    response.json({
      name: data.name,
      email: data.email,
      id: data._id,
    });
  });
};
