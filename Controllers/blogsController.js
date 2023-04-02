const Blogs = require('../Schema/blogSchema')

module.exports = {
    getHome : async(req,res)=>{
        const blogs = await Blogs.find()
        res.json(blogs)
    },
    postHome :async(req,res)=>{
        await Blogs.create({
                      author:req.body.author,
                      title:req.body.title,
                      text:req.body.text})
    },
    getBlogDetails : async(req,res)=>{
        const blog = await Blogs.findById(req.params.id)
        res.json(blog)
    }
}