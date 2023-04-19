const express = require('express')
const router = express.Router()
const blogsController = require('../Controllers/blogsController.js')
const verify = require('../Controllers/verify.js')

router.get('/',blogsController.getHome)
router.get('/:id',blogsController.getBlogDetails)
router.post('/',verify.verify,blogsController.postHome)
router.post('/update/:id',verify.verify,blogsController.updateBlog)
router.get('/search/byQuery',blogsController.searchByQuery)

module.exports = router 