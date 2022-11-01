const User = require("../model/userModel");
const asyncAwait = require("../middleware/asyncAwait");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorHandler");

//Register user--ok
exports.registerUser = asyncAwait(async (req, res, next) => {
  const { email, name, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

//Create user by admin
exports.createUserByAdmin = asyncAwait(async (req, res, next) => {
  const { email, name, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    creator: req.user,
  });

  if (!user) {
    throw new ErrorHandler("Internal server error!", 500);
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//Login a user--ok
exports.loginUser = asyncAwait(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new ErrorHandler("Please Enter Email & Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  if (password !== user.password) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});

//Update a user--ok
exports.updateUser = asyncAwait(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

//Get Logged in user
exports.getLoggedInUser = asyncAwait(async (req, res, next) => {
  let user = await User.findById(req.user.id);

  if (!user) {
    next(new ErrorHandler("User not found!", 500));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//Get ALL user
exports.getAllUser = asyncAwait(async (req, res, next) => {
  let users = await User.find();

  if (!users) {
    next(new ErrorHandler("User not found!", 500));
  }
  res.status(200).json({
    success: true,
    users,
  });
});

//Get user details
exports.getUserDetails = asyncAwait(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    next(new ErrorHandler("User not found!", 500));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//Delete a user only access for admin --ok
exports.deleteUser = asyncAwait(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ErrorHandler("User not found!", 500);

  if (user.role === "admin") {
    next(new ErrorHandler("Not access to remove 'admin'!", 500));
  } else {
    await user.remove();
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

//Logout a user
exports.logoutUser = asyncAwait(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});
