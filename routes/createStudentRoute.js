const express = require("express");
const router = express.Router();
const createStudentController = require("../controllers/createStudentController");


router.post("/", createStudentController.createStud);
router.get("/", createStudentController.readStud);
router.get("/nonadmis", createStudentController.getNumberOfNonAdmittedStudents);
router.get("/admis", createStudentController.getNumberOfAdmittedStudents);
router.delete("/:id", createStudentController.deleteStudents);

module.exports = router;