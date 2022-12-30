const express = require("express");
const {
  loginUser,
  signupUser
} = require("../controller/usersController");

const router = express.Router();

// Contains all routes related to users

router.post("/login", loginUser); // login user

router.post("/signup", signupUser); // sign up new user


module.exports = router;
