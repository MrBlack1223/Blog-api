const Blogs = require('../Schema/blogSchema.js')
const User = require('../Schema/userSchema.js')
module.exports = {
    getHome : async(req,res)=>{
        const skip = req.query.skip ? Number(req.query.skip) : 0
        const LIMIT = 6
        try{
            const blogs = await Blogs.find().skip(skip).limit(LIMIT)
            res.json(blogs) 
        }catch(error){
            res.status(500).json(error)
        }  
    },
    postHome :async(req,res)=>{
        try{
          const user = await User.findOne({name: req.body.author})
          if(user._id.toString() !== req.user.id) return res.status(500).send("Can't add blog, user id don't match")
          const newBlog = await Blogs.create({
                    author: req.body.author,
                    authorID: req.user.id,
                    title: req.body.title,
                    text: req.body.text})
          await user.updateOne({$push:{ blogs: newBlog._id.toString() }})
          res.status(200).send("Blog has been added")
        }catch(error){
          res.status(500).json(error)
        }
    },
    searchByQuery :async(req,res)=>{
        try{
            const LIMIT = 4
            const query = req.query.q ? req.query.q : ''
            const blogs = await Blogs.find({title: { '$regex': query, '$options': 'i' }}).limit(LIMIT)
            res.status(200).json(blogs)
        }catch(error){
            res.status(501).json(error)
        }
    },
    getBlogDetails : async(req,res)=>{
        try{
            const blog = await Blogs.findById(req.params.id)
            res.json(blog)
        }catch(error){
            res.status(502).json(error)
        }
        
    },
    updateBlog : async(req,res)=>{
        try{
            const blog = await Blogs.findById(req.params.id)
            if(blog.authorID!== req.user.id) return res.status(400).send('cant update this article')
            await blog.updateOne({ title: req.body.title, text: req.body.text })
            res.status(200).send("Blog has been updated")
        }catch(error){
            res.status(502).json(error)
        }
    },
    deleteBlog : async(req,res)=>{
        try{
            const blog = await Blogs.findById(req.params.id)
            const user = await User.findById(req.user.id)
            if(blog.authorID !== req.user.id) return res.status(400).send('cant delete this article')
            const newBlogArray =  user.blogs.filter((item)=> item !== blog._id.toString())
            await user.updateOne({blogs : newBlogArray})
            await blog.deleteOne()
            res.status(200).send("Blog has been deleted")
        }catch(error){
            res.status(502).json(error)
        }
    },
    likeBlog : async(req,res)=>{
        try{
            const blog = await Blogs.findById(req.params.id)
            await blog.updateOne({ $addToSet: { likes: req.user.id } })
            res.status(200).json('blogLiked')
        }catch(e){
            res.status(500).json(e)
        }
    },
    dislikeBlog : async(req,res)=>{
        try{
            const blog = await Blogs.findById(req.params.id)
            const newLikesArray = blog.likes.filter(item=> item !== req.user.id )
            await blog.updateOne({ likes: newLikesArray })
            res.status(200).json('blog disliked')
        }catch(e){
            res.status(500).json(e)
        }
    }
}