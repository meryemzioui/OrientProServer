const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,

});

module.exports = upload;