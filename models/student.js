const mongoose = require("mongoose");
const studentsShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classe: {
    type: Number,
    required: true,
  },
  date_de_naissance: {
    type: Number,
    required: true,
  },

  notes: [
    {
      mathematique: {
        type: Number,
      },
      physique: {
        type: Number,
      },
      science: {
        type: Number,
      },
      technologie: {
        type: Number,
      },
      moyenne: {
        type: Number,
      },
    },
  ],
});
module.exports = mongoose.model("Student", studentsShema);
