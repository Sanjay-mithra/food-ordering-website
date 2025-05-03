const jwt = require("jsonwebtoken");
const { userModel } = require("../model/userModel");
const { adminModel } = require("../model/adminModel");
const { comparePassword } = require("../utilities/passwordUtilities");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let account = await adminModel.findOne({ email });
    let role = "admin";

    if (!account) {
      account = await userModel.findOne({ email });
      role = "user";
    }

    if (!account) {
      return res.status(400).json({ error: "Account does not exist" });
    }

    const isMatch = await comparePassword(password, account.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const token = generateToken(account._id, role);

    // Set role-based cookie
    if (role === "admin") {
      res.cookie("adminToken", token);
    } else {
      res.cookie("userToken", token);
    }

    const userData = account.toObject();
    delete userData.password;

    res.status(200).json({
      message: `Login successful as ${role}`,
      user: userData,
      token,
      role,
    });

  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "Internal server error" });
  }
};

module.exports = {
  login,
};
