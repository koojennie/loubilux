const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superadmin"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("validate", async function (next) {
  if (!this.userId) {
    try {
      const lastUser = await this.constructor.findOne().sort({ createdAt: -1 });
      const lastNumber = lastUser ? parseInt(lastUser.userId.split("-")[1]) : 0;
      this.userId = `USR-${String(lastNumber + 1).padStart(4, "0")}`;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
