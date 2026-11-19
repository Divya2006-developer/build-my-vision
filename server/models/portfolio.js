const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    designer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["flooring", "wall-colours", "tiles", "stairs", "kitchen", "bedroom", "living-room", "exterior"],
      required: true,
    },
    images: [{ type: String }],
    style: { type: String, default: "modern" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
