const express = require('express')
const router = express.Router()
const Blogs = require('../Schema/blogSchema')
const blogsController = require('../Controllers/blogsController')

router.get('/',blogsController.getHome)
router.get('/:id',blogsController.getBlogDetails)
router.post('/',blogsController.postHome)
router.get('/search/byQuery',blogsController.searchByQuery)

module.exports = router 