const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const User = require("./auth.model");
const JWT_TOKEN = "shhhhh";

// Controller for creating a user
const createUser = async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  // check whether the email exists already

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "This email already exists" });
    }

    // Salt and hash the password using bcrypt
    const salt = await bycrypt.genSalt(10);
    const secPass = await bycrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    // Return the jsonwebtoken
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_TOKEN);

    res.json({
      success: true,
      authToken: authToken,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("/Creauser Err:", error.message);
    res.status(500).send("Internal server error");
  }
};

// Controller for user login
const loginUser = async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  // check whether the email exists already

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    // If user does not exists
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Please try to login with correct credentials",
      });
    }

    // else compare the password
    const passwordCompare = await bycrypt.compare(password, user.password);

    // If password does not match
    if (!passwordCompare) {
      return res.status(400).json({
        success: false,
        error: "Please try to login with correct credentials",
      });
    }

    // else Return the jsonwebtoken

    const payload = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(payload, JWT_TOKEN);
    res.json({
      success: true,
      authToken: authToken,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server error" });
  }
};

// Controller for getting user details
const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send({ success: true, user: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  createUser,
  loginUser,
  getUser,
};
