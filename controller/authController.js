const bc = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/UserModel");

const register = async (req, res, next) => {
  const data = req.body;
  const oldUser = await Users.findOne({ email: data.email });
  console.log(oldUser);
  if (oldUser) {
    return res.status(400).json({
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
      message: "User registered successfully!",
      data: data,
      token: token,
    });
    return;
  }
};

const login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    console.log(req.body);

    // Validate user input
    if (!(email && password)) {
      return res.status(400).json({
        success: false,
        status: "Утгуудаа бүрэн оруулна уу.",
        updated: 1,
        email: email,
        password: password,
      });
    } else {
      // Validate if user exist in our database
      const user = await Users.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // user
        return res.status(200).json({
          success: true,
          status: "Амжилттай нэвтэрлээ.",
          data: user,
          token: token,
        });
      } else {
        return res.status(400).json({
          success: false,
          status: "Нууц үг нэр хоорондоо таарахгүй байна.",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  register,
  login,
};
