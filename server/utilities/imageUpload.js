const cloudinary = require('../config/cloudinaryConfig');

const uploadToCloudinary = async (filepath) => {
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      folder: 'foods',
    });
    return result.secure_url;
  } catch (error) {
    console.log("Cloudinary upload error:", error);
    throw new Error(error.message || "Image upload failed");
  }
};

module.exports = uploadToCloudinary;