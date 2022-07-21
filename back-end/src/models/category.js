const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
      trim: true,
    },
    slug: {
      type: "string",
      required: true,
      unique: true,
    },
    parentId: {
      type: "string",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", categorySchema);
