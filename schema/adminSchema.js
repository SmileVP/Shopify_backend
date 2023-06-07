const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: {
      type: String,
      require: true,
    },
    mobile: {
      type: Number,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    token: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "y",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false, collection: "admin" }
);

const adminModel = mongoose.model("admin", AdminSchema); //
module.exports = { adminModel };
