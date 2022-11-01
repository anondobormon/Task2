//External Imports
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

//Internal Imports
const ErrorHandler = require("../utils/errorHandler");
const asyncAwait = require("./asyncAwait");

//Checking user is login or not
exports.isAuthenticatedUser = asyncAwait(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to access", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);
  next();
});

//Checking editor or admin
exports.authorizedRole = (role) => {
  return (req, res, next) => {
    if (role !== req.user.role) {
      return next(
        new ErrorHandler(`Role: ${req.user.role} is not allowed to access`, 403)
      );
    }
    next();
  };
};
