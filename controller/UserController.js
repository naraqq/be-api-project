const User = require("../models/UserModel");

const get_user = (req, res, next) => {
  User.find({}, function (err, data) {
    if (err) {
      throw err;
    } else {
      return res.json({
        data: data,
      });
    }
  });
};

const create_user = (req, res, next) => {
  console.log(JSON.stringify(req.body.name));
  let newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    password: req.body.password,
  });
  newUser
    .save()
    .then((data) => {
      res.status(201).json({
        message: "Handling POST requests to /User",
        createdUser: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(201).json({
        message: "Handling POST requests to /User",
      });
    });
};
module.exports = { get_user, create_user };
