const mongoose = require("mongoose");
const studShema = new mongoose.Schema({
  filiere: {
    type: String,
  },
  classe: {
    type: Number,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  datedenaissance: {
    type: Date,
    
  },
  moyg: {
    type: Number,
    
  },
  math: {
    type: Number,
    
  },
  phys: {
    type: Number,
    
  },
  
  scie: {
    type: Number,
    
  },

Math: {
  type: Number,
  
},
phys: {
  type: Number,
  
},

scie: {
  type: Number,
  
},
choix: {
  type: String,
  
},
orient: {
  type: String,
  
},
},
);

module.exports = mongoose.model("stud", studShema);