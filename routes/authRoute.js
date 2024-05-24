const express = require('express')
const router = express.Router()
const authController=require('../controllers/authController')



router.post("/register",authController.register)
router.get("/register",authController.readUsers)
router.post("/login",authController.login)


router.delete("/register/:id",authController.deleteUsers)

module.exports = router;