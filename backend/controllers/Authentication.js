const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { transporter } = require("../config/nodemailer");
require("dotenv").config();

//authentication
exports.auth = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (token) {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      return res.json({
        login: true,
        data: decode,
      });
    } else {
      return res.json({
        login: false,
        data: "error",
      });
    }
  } catch (error) {
    console.log("Internal Server Error", error);
  }
};

//signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Unable to hash password",
      });
    }
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log("Signup Successful");
    return res.status(200).json({
      success: true,
      message: "User created successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the details",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User Does Not Exists!",
      });
    }
    const payload = {
      email: user.email,
      id: user.id,
      name: user.name,
    };

    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "15d",
      });

      console.log("Login Successful");
      return res.status(200).json({
        success: true,
        message: "User logged in successfully!",
        token: token,
        data: payload,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid Password!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.sendOTP = async (req, res) => {
  try {
    const { email, name, otp } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
    console.log("Check kar liya");
    const info = await transporter.sendMail({
      from: '"Task Pilot 📝" <taskpilot.app@gmail.com>',
      to: `${email}`,
      subject: "Your One Time Password for Registration at Task Pilot",
      html: `
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          p {
          margin-bottom: 0;
          padding-bottom: 0;
          }
        </style>
      </head>
      <body>
        <h3>Hello ${name}!</h3>
        <p>Your one-time password for registering an account at <b>Task Pilot</b> is: <b>${otp}</b></p>
        <p>Wishing you a seamless and productive journey with <b>Task Pilot!</b></p>
        <div>
        <pre style="font-weight: bold; font-family: sans-serif;">Akshat Dubey
Task Pilot</pre>
        </div>
      </body>
    </html>
  `,
    });
    return res.json({
      success: true,
      message: "OTP sent successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    await User.findOneAndDelete({ email: email })
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Account deleted successfully",
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(400).json({
          success: false,
          message: "Account couldn't be deleted",
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
