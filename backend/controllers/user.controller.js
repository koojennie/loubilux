const User = require("../models/user.models");
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const cloudinary = require("../lib/cloudinary");

exports.getAllUsers = async (req, res) => {
  try {
    let { sortBy, sortOrder, limit, page, searchQuery } = req.query;

    sortOrder = sortOrder === "desc" ? -1 : 1;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;

    const query = {};
    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: "i" };
    }

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await User.find(query)
      .select(
        "userId name username email phoneNumber role profilePicture createdAt updatedAt"
      )
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return res.status(200).json({
      status: "success",
      message: "Users retrieved successfully",
      totalUsers: totalUsers,
      page,
      limit,
      totalPages,
      data: users,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error message",
      error: error.message,
    });
  }
};

// get user by id
exports.getUserbyId = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    return res.status(200).json({
      status: "success",
      message: `User found successfully`,
      data: user,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error message ",
      error: error.message,
    });
  }
};

// update user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check apakah user ada
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.username) updates.username = req.body.username;
    if (req.body.email) updates.email = req.body.email;
    if (req.body.phoneNumber) updates.phoneNumber = req.body.phoneNumber;
    if (req.body.role) updates.role = req.body.role;
    if (req.body.password) updates.password = req.body.password;

    // image
    const { profilePicture, newImage, oldImage, deletedImage, keepImage } =
      req.body;

    // case 2 & case 3 delete image
    if (deletedImage) {
      try{
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`users/${publicId}`);
        updates.profilePicture = "";
      } catch(error) {
        return res.status(500).json({
          status: "error",
          message: "Deleted Image failed",
          error: error.message
        });
      }
    }
    
    // case 1 & case 3
    if(newImage){
      try {
        const uploadedResponse = await cloudinary.uploader.upload(
          profilePicture,
          {
            folder: "users",
            upload_preset: "ml_default",
          }
        );
        updates.profilePicture = uploadedResponse.secure_url; // Save the URL to the user's profile
      } catch (error) {
        console.error("Cloudinary Upload Error", error);
        return res.status(500).json({
          status: "error",
          message: "Image upload failed",
          error: error.message,
        });
      }
    }

    // case 4

    if(keepImage){
      updates.profilePicture = profilePicture;
    }


    if(profilePicture === "") {
      updates.profilePictureUrl =
        "https://res.cloudinary.com/dqjlprqcy/image/upload/v1742188549/user-loubilux_ldr7fh.svg";
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Delete profile picture from Cloudinary if it exists
    if (user.profilePicture && user.profilePicture !== "https://res.cloudinary.com/dqjlprqcy/image/upload/v1742188549/user-loubilux_ldr7fh.svg") {
      try {
      const publicId = user.profilePicture.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`users/${publicId}`);
      } catch (error) {
      console.error("Cloudinary Deletion Error", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to delete profile picture from Cloudinary",
        error: error.message,
      });
      }
    }

    // Remove user from database
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.generateUserId = async (req, res) => {
  try {
    const lastUser = await User.findOne().sort({ createdAt: -1 });

    let lastNumber = 0;
    if (lastUser && lastUser.userId) {
      const userIdParts = lastUser.userId.split("-");
      if (userIdParts.length === 2) {
        lastNumber = parseInt(userIdParts[1]) || 0;
      }
    }

    const userId = `USR-${String(lastNumber + 1).padStart(4, "0")}`;

    return res.status(200).json({
      status: "success",
      message: "User ID successfully generated",
      userId: userId,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
