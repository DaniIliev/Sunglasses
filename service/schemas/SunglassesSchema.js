
const mongoose = require("mongoose");

const sunglassesSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Name is required!"]
  },
  frameWidth: {
    type: String,
    required: [true, "Frame width is required"], // Error message for missing frame width
    description: "Frame width in millimeters",
  },
  frameHeight: {
    type: String,
    required: [true, "Frame height is required"], // Error message for missing frame height
    description: "Frame height in millimeters",
  },
  lensWidth: {
    type: String,
    required: [true, "Lens width is required"], // Error message for missing lens width
    description: "Lens width in millimeters",
  },
  templeLength: {
    type: String,
    required: [true, "Temple length is required"], // Error message for missing temple length
    description: "Temple length in millimeters",
  },
  price:{
    type: String,
    required: [true, "Price is required!"]
  },
  oldPrice:{
    type: String,
  },
  description: {
    type: String,
    required: [true, "Description is required!"]
  },
  gender: {
    type: String,
    // enum: {
    //   values: ["Male", "Female", "Unisex"],
    //   message: "Gender must be either Male, Female, or Unisex",
    // },
    required: [true, "Gender is required"], // Error message for missing gender
  },
  createdAt: { type: Date, default: Date.now},
  frameShape: {
    type: String,
    // enum: {
    //   values: ["Round", "Square", "Aviator", "Rectangle", "Cat Eye", "Other"],
    //   message:
    //     "Frame shape must be one of Round, Square, Aviator, Rectangle, Cat Eye, or Other",
    // },
    required: [true, "Frame shape is required"], // Error message for missing frame shape
  },
  lensType: {
    type: String,
    // enum: {
    //   values: ["Polarized", "Photochromic", "Blue Light Blocking", "Standard"],
    //   message:
    //     "Lens type must be one of Polarized, Photochromic, Blue Light Blocking, or Standard",
    // },
    required: [true, "Lens type is required"], // Error message for missing lens type
  },
  frameColor:{
    type: String,
    required: true,
  },
  frameMaterial: {
    type: String,
    // enum: {
    //   values: ["Metal", "Plastic", "Mixed", "Other"],
    //   message: "Frame material must be one of Metal, Plastic, Mixed, or Other",
    // },
    required: [true, "Frame material is required"], // Error message for missing frame material
  },
  UV_Protection: {
    type: String,
    // enum: {
    //   values: ["UV400", "None", "Other"],
    //   message: "UV protection must be either UV400, None, or Other",
    // },
    required: [true, "UV protection is required"], // Error message for missing UV protection
  },
  images: {
    type: [String],
    required: [true, "At least one image is required"], //
    description: "File path or URL for uploaded image",
  },

  likes: {
    type: Array,
    ref: "User",
    default: [],
    description: "Array of user IDs who liked the sunglasses",
  },
});

const Sunglasses = mongoose.model("Sunglasses", sunglassesSchema);

module.exports = Sunglasses;
