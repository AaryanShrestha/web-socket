const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    userName: {
      type: String, // reference a User model here
    },
    rating: {
      type: Number,
    },
    subject: {
      type: String,
    },
    review: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", dataSchema);
