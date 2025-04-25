const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const mongoose = require("mongoose");
const { sequelize } = require('../lib/connection');
const cloudinary = require('../lib/cloudinary');
const { Sequelize } = require("sequelize");

exports.register = async (req, res) => {
  try {
    const {
      name,
      username,
      password,
      email,
      phoneNumber,
      role,
      confirmPassword,
      profilePicture,
    } = req.body;

    if (
      !name ||
      !username ||
      !password ||
      !email ||
      !role ||
      !confirmPassword
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields are required" });
    }

    if (username.length < 6 || username.length > 30) {
      return res
        .status(400)
        .json({ status: "error", message: "Username must be 6-30 characters" });
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[\W_]/.test(password)
    ) {
      return res
        .status(400)
        .json({
          status: "error",
          message:
            "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
        });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ status: "error", message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({
      where: {
      [Sequelize.Op.or]: [{ username }, { email }],
      },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", message: "Username or email already exists" });
    }

    let profilePictureUrl = "";

    if (profilePicture) {
      try {
        const uploadedResponse = await cloudinary.uploader.upload(profilePicture, {
          folder: "users",
          upload_preset: "ml_default",
        });
        profilePictureUrl = uploadedResponse.secure_url; // Save the URL to the user's profile
      } catch (error) {
        console.error("Cloudinary Upload Error", error);
        return res
          .status(500)
          .json({ status: "error", message: "Image upload failed", error: error.message });
      }
    } else {
      profilePictureUrl = "https://res.cloudinary.com/dqjlprqcy/image/upload/v1742188549/user-loubilux_ldr7fh.svg";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdAt = new Date();
    const updateAt = new Date();

    const newUser = await User.create({
      name,
      username,
      password: hashedPassword,
      email,
      phoneNumber,
      role,
      profilePicture: profilePictureUrl,
      isVerified: false,
      createdAt,
      updateAt,
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // await sendVerificationEmail(email, token);

    res
      .status(201)
      .json({
        status: "success",
        message: "User registered",
        data: newUser,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        status: "error",
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: { username },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.cookie("jwtToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    res
      .status(200)
      .json({
        status: "success",
        message: "Logged in successfully",
        role: user.role,
        token,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        status: "error",
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwtToken");
  res.status(200).json({ message: "Logged out successfully" });
};

exports.me = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json({ message: "Users login", user: req.user });
};
