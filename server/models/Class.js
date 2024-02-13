const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ["Coming Soon", "Enrolment", "In Progress", "Completed"]
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor"
  }
});

module.exports = mongoose.model("Class", ClassSchema);
