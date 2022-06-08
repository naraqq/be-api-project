const bc = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");
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
};

// const login = async (req, res, next) => {
//   const oldUser = Users.findOne({ email: req.body.email });
//   console.log(req.body);
//   const email = req.body.email;
//   const password = req.body.password;
//   if (req.body.email == null || req.body.password == null) {
//     res.json({
//       message: "please enter both email and password!",
//     });
//   }

//   if (!oldUser) {
//     res.json({
//       message: "redirect to profile",
//     });
//   }
//   if (oldUser && (await bcrypt.compare(password, oldUser.password))) {
//     //Create token
//     const token = jwt.sign(
//       {
//         user_id: oldUser._id,
//         email,
//       },
//       process.env.TOKEN_KEY,
//       {
//         expiresIn: "2h",
//       }
//     );
//     res.json({
//       success: email + " " + password,
//       token: token,
//     });
//   }
//   res.send("messge");
// };
const login = async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

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
  // Our register logic ends here
};
module.exports = {
  register,
  login,
};
