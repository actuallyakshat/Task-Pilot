const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if the user exists before attempting the update
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    await User.findOneAndUpdate({ email }, { name, email });

    res.status(200).json({
      success: true,
      message: "Account updated successfully",
    });
  } catch (error) {
    console.error("Error while updating user details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Unable to hash password",
      });
    }

    await User.findOneAndUpdate({ email: email }, { password: hashedPassword })
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Password updated successfully",
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(400).json({
          success: false,
          message: "Password couldn't be updated",
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
