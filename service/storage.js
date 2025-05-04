const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("./cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "sunglasses", 
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage });
module.exports = upload;
