const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const excelDataMiddleware = require("../middlewares/excelDataMiddleware");

router.post("/", excelDataMiddleware, studentController.createStudents);

module.exports = router;
