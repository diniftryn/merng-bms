const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  }
});

module.exports = mongoose.model("Instructor", InstructorSchema);
