const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const JWT_SECRET = config.get("jwtSecret");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});
router.post("/register", (req, res) => {
  const { username, email, password, password2 } = req.body;
  let errors = [];
  if (!username || !email || !password || !password2) {
    errors.push("Please fill in all fields");
  }
  if (password !== password2) {
    errors.push("passwords do not match");
  }
  if (password.length < 6) {
    errors.push("password should be at least 6 characters");
  }
  if (errors.length > 0) {
    res.status(500).json({ message: { msgBody: errors, msgError: true } });
  } else {
    User.findOne({ email }).then((user) => {
      if (user) {
        errors.push("Email is already registered");
        res.status(400).json({
          message: { msgBody: errors, msgError: true },
        });
      } else {
        const newUser = new User({
          username,
          email,
          password,
        });
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
                  expiresIn: 3600,
                });

                res.status(201).json({
                  token,
                  message: {
                    msgBody: ["Account successfully created"],
                    msgError: false,
                  },
                  user: {
                    id: newUser.id,
                    name: newUser.username,
                    email: newUser.email,
                  },
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: {
                    message: {
                      msgBody: ["Error has occured in saving"],
                      msgError: true,
                    },
                  },
                });
              });
          })
        );
      }
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: { msgBody: ["Please enter all fields"], msgError: true },
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) throw Error("user Does not exist");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Invalid Credentials");

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: 3600,
    });

    res.status(200).json({
      token,
      message: {
        msgBody: ["Account successfully loggedIn"],
        msgError: false,
      },
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: { msgBody: [error.message], msgError: true } });
  }
});
module.exports = router;
