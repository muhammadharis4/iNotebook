const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getUser,
} = require("./auth.controller");
const { body } = require("express-validator");
const fetchuser = require("../../middleware/fetchuser");

// Route 1: Create a user using: POST "/api/auth/". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  createUser
);

// Route 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  loginUser
);

// Route 3: Get logged-in User details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, getUser);

module.exports = router;
