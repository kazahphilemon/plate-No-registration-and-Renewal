const express = require("express")
const userController = require("../controller/user-controller")
const userService = require('../services/user-service')
const sendmail = require("../utils/sendmail")


const router = express.Router()


router.post("/create", userController.registration)
router.post("/login", userController.login)
router.post("/forgot_password", userService.forgot_password)
// router.get("/reset-password/:id/:Access_token", userService.reset_password)
router.post("/reset-password/:userId/:token", userService.resetPassword)
router.post("/sendmail", sendmail.mail)



// router.delete("/delete/:id", userController.deleteUser)
// router.put("/update/:id", userController.updateUser)
// router.get('/:id', userController.getAllUser)
// router.get('/', userController.getUser)

module.exports = router