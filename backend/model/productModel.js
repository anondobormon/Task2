//External Imports
const mongoose = require("mongoose");

//Create database structure
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please write blog title"],
      minLength: [8, "Title Should more then 8 characters"],
    },

    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
