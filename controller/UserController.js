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
// router.get("/user?search", (req, res) => {});
module.exports = { get_user };
