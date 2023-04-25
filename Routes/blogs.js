const express = require('express')
const router = express.Router()
const blogsController = require('../Controllers/blogsController.js')
const verify = require('../Controllers/verify.js')

router.get('/',blogsController.getHome)

router.get('/:id',blogsController.getBlogDetails)

router.post('/',verify.verify,blogsController.postHome)

router.get('/search/byQuery',blogsController.searchByQuery)

router.delete('/delete/:id',verify.verify,blogsController.deleteBlog)

router.post('/update/:id',verify.verify,blogsController.updateBlog)

router.post('/like/:id',verify.verify,blogsController.likeBlog)

router.post('/dislike/:id',verify.verify,blogsController.dislikeBlog)

router.post('/comments/add/:id',verify.verify, blogsController.addComment)

module.exports = router 