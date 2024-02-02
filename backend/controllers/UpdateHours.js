const User = require("../models/User");

exports.updateMins = async (req, res) => {
  try {
    const { email, minsCompleted } = req.body;

    await User.findOneAndUpdate(
      { email: email },
      { minsCompleted: minsCompleted }
    );

    return res.status(200).json({
      success: true,
      message: "Minutes updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
