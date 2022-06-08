const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/UserModel");

const register = async (req, res, next) => {
  const data = req.body;
  const oldUser = Users.findOne({ email: data.email });
  if (oldUser == !null) {
    res.status(400).json({
      success: false,
      message: "user already exists, try different email !",
    });
  } else {
    let hashedPassword = await bc.hash(data.password, 10);
    data.password = hashedPassword;
    data.role == 0 ? (data.role_id = 1) : (data.role_id = data.role);
    data.created_date = Date("Y-m-d");
    data.last_activity = Date("Y-m-d h:m:s");

    //TOKEN SECTION
    email = data.email;
    const token = jwt.sign(
      {
        user_id: data._id,
        email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    console.log(token);

    Users.create(data);
    res.status(200).json({
      success: true,
      data: data,
      token: token,
    });
    return;
  }
  next();
};

module.exports = {
  register,
};
