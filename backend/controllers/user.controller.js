const User = require("../models/user.models");
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

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
      .select("userId name username email phoneNumber role profilePicture createdAt updatedAt")
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

    // check if user exist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.remove();

    return res.status(200).json({
      status: "success",
      message: "User deleted successfully",
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