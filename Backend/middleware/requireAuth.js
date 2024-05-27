const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    console.log("Protected Route has been Accessed");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

const admin = async (req, res, next) => {
  console.log(req.user);
  const user = await User.findById(req.user);
  console.log(user);
  if (user && user.roles && user.roles.includes("admin")) {
    console.log("Next is triggered");
    next();
  } else {
    res
      .status(403)
      .json({ error: "Request is not authorized for normal users" });
  }
};

module.exports = {
  requireAuth,
  admin,
};
