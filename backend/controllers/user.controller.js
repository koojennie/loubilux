const User = require("../models/user.model");
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const cloudinary = require("../lib/cloudinary");
const Sequelize = require('sequelize');

exports.getAllUsers = async (req, res) => {
  try {
    let { sortBy, sortOrder, limit, page, searchQuery } = req.query;

    sortOrder = sortOrder === "desc" ? "DESC" : "ASC";
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;

    const whereClause = {};
    if (searchQuery) {
      whereClause.name = { [Sequelize.Op.iLike]: `%${searchQuery}%` };
    }

    const totalUsers = await User.count({ where: whereClause });
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await User.findAll({
      attributes: [
        "userId",
        "name",
        "username",
        "email",
        "phoneNumber",
        "role",
        "profilePicture",
        "createdAt",
        "updatedAt",
      ],
      where: whereClause,
      order: [[sortBy || "createdAt", sortOrder]],
      offset: (page - 1) * limit,
      limit: limit,
    });

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
    const user = await User.findOne({ where: { userId } });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "User found successfully",
      data: user,
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

// update user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    
    if (req.body.password) {
      if (!req.body.confirmPassword) {
        return res.status(400).json({
          status: "error",
          message: "Please provide confirmPassword",
        });
      }
      if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
          status: "error",
          message: "Password and confirmPassword do not match",
        });
      }
    }

    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.username) updates.username = req.body.username;
    if (req.body.email) updates.email = req.body.email;
    if (req.body.phoneNumber) updates.phoneNumber = req.body.phoneNumber;
    if (req.body.role) updates.role = req.body.role;
    if (req.body.password) updates.password = req.body.password;

    // Handle profile picture updates
    const { profilePicture, newImage, deletedImage, keepImage } = req.body;

    // Case 2 & Case 3: Delete image
    if (deletedImage) {
      try {
        const publicId = profilePicture.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`users/${publicId}`);
        updates.profilePicture =  "https://res.cloudinary.com/dqjlprqcy/image/upload/v1742188549/user-loubilux_ldr7fh.svg";
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: "Failed to delete image",
          error: error.message,
        });
      }
    }

    // Case 1 & Case 3: Upload new image
    if (newImage) {
      try {
        const uploadedResponse = await cloudinary.uploader.upload(profilePicture, {
          folder: "users",
          upload_preset: "ml_default",
        });
        updates.profilePicture = uploadedResponse.secure_url;
      } catch (error) {
        console.error("Cloudinary Upload Error", error);
        return res.status(500).json({
          status: "error",
          message: "Image upload failed",
          error: error.message,
        });
      }
    }

    // Case 4: Keep existing image
    if (keepImage) {
      updates.profilePicture = profilePicture;
    }

    // Default profile picture if none is provided
    if (!profilePicture) {
      updates.profilePicture =
        "https://res.cloudinary.com/dqjlprqcy/image/upload/v1742188549/user-loubilux_ldr7fh.svg";
    }

    // Update user in the database
    await User.update(updates, { where: { userId } });

    // Fetch the updated user
    const updatedUser = await User.findOne({ where: { userId } });

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
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Delete profile picture from Cloudinary if it exists
    if (
      user.profilePicture &&
      user.profilePicture !==
        "https://res.cloudinary.com/dqjlprqcy/image/upload/v1742188549/user-loubilux_ldr7fh.svg"
    ) {
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
    await User.destroy({ where: { userId } });

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
    const lastUser = await User.findOne({
      order: [["createdAt", "DESC"]],
    });

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
