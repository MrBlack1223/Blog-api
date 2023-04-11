const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController.js')
const verify = require('../Controllers/verify.js')

router.post('/signup',userController.createUser)
router.post('/signin',userController.login)
router.get('/logout',userController.logout)
router.get('/myblogs',verify.verify, userController.myBlogs)

module.exports = router 