const User = require("../model/userModel");
const Product = require("../model/productModel");
const asyncAwait = require("../middleware/asyncAwait");
const ErrorHandler = require("../utils/errorHandler");

//Create Product
exports.createProduct = asyncAwait(async (req, res, next) => {
  const { title, description } = req.body;
  const product = await Product.create({
    title,
    description,
    user: req.user.id,
  });

  if (!product) next(new ErrorHandler("Internal server error", 404));

  res.status(200).json({
    success: true,
  });
});

//Get all product
exports.getAllProduct = asyncAwait(async (req, res, next) => {
  const products = await Product.find();
  if (!products) {
    return next(new ErrorHandler("Internal server error", 404));
  }

  res.status(200).json({
    success: true,
    products,
  });
});

//Get a product
exports.getAProduct = asyncAwait(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Internal server error", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Update a product
exports.updateProduct = asyncAwait(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!product) {
    return next(new ErrorHandler("Internal server error", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete a product
exports.deleteProduct = asyncAwait(async (req, res, next) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});
