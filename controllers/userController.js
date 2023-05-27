// Import contact model
User = require("../models/userModel");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

dotenv.config();
// Handle index actions
exports.index = async function (req, res) {
  await User.get(function (err, users) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Users retrieved successfully",
      data: users,
    });
  });
};

// Handle create user actions
exports.new = async function (req, res) {
  console.log(req.body);
  var user = new User();
  user.email = req.body.email;
  user.name = req.body.name ? req.body.name : user.name;
  user.password = bcrypt.hashSync(req.body.password, saltRounds);

  await user.save(function (err) {
    console.log(user);

    if (err) res.json(err);
    res.json({
      message: "New user created!",
      data: user,
    });
  });

  // save the user and check for errors
};
// Handle view user info
exports.view = function (req, res) {
  User.findById(req.params._id, function (err, user) {
    if (err) res.send(err);
    res.json({
      message: "User details loading..",
      data: user,
    });
  });
};
// Handle update user info
exports.update = function (req, res) {
  console.log(req.body);
  User.findById(req.body._id, function (err, user) {
    if (err) res.send(err);
    user.email = req.body.data.email;
    user.name = req.body.data.name ? req.body.data.name : user.name;
    user.password = bcrypt.hashSync(req.body.data.password, saltRounds);
    // save the user and check for errors
    user.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "User Info updated",
        data: user,
      });
    });
  });
};
// Handle delete user
exports.delete = function (req, res) {
  User.deleteOne(
    {
      _id: req.params._id,
    },
    function (err, user) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "User deleted",
      });
    }
  );
};

// User login

exports.userLogin = function (req, res) {
  // let tokenHeaderKey ="123456789";
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      const auth = bcrypt.compareSync(req.body.password, user.password);
      const token = jwt.sign({}, jwtSecretKey);
      if (err) return console.log(err);
      else if (!auth)
        return res.status(400).json({
          status: "Unauthorized",
          message: "Please enter correct Password",
        });

      res.json({
        status: "success",
        message: "User Logged-in",
        token: token,
        name: user.name,
      });
    }
  );

  // try {
  //   const token = req.header("token");

  //   const verified = jwt.verify(token, jwtSecretKey);
  //   if (verified) {

  //   } else {
  //     // Access Denied
  //     return res.send("Unauthorized");
  //   }
  // } catch (error) {
  //   return res.send("Unauthorized");
  // }
  //test 1
};
