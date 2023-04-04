const Blogs = require('../Schema/blogSchema')

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
          await Blogs.create({
                      author:req.body.author,
                      title:req.body.title,
                      text:req.body.text})  
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
        
    }
}