const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

let self = {};

self.jwtVerify = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (typeof token !== "undefined") {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
        return user;
      } catch (error) {
        return res.status(401).json({ message: error.message });
      }
    } else {
      return res.status(401).json({
        message: "Token is not provided to authorized the user.",
      });
    }
  } else {
    return res.status(401).json({
      error: "Authorization is not provided.",
    });
  }
};

module.exports = self;
