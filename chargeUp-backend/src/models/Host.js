const mongoose = require("mongoose");

const hostDetailSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    idNumber: { type: String, required: true },
    telephone: { type: String, required: true },
    chargerType: { type: String, required: true },
  },
  { timestamps: true } // This automatically adds createdAt and updatedAt dates!
);

module.exports = mongoose.model("Host", hostDetailSchema);