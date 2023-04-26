const User = require('../Schema/userSchema.js')
const Blogs = require('../Schema/blogSchema.js')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    createUser : async(req,res,next)=>{
        try{
            const passwordRegex = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$')
            const nameRegex = new RegExp('^[A-Za-z0-9]{3,16}$')
            if(!nameRegex.test(req.body.name)) return res.status(500).send('Username should be 3-16 characters and shouldnt include any special character!')
            if(!passwordRegex.test(req.body.password)) return res.status(500).send('Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!')
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = new User({
                name: req.body.name,
                password: hashedPassword
            })
            await user.save()
            res.send(user)
        }catch(e){
            res.status(500).send('User alredy exists')
        }
    },
    myBlogs: async(req,res,next)=>{
        try{
            const skip = req.query.skip ? Number(req.query.skip) : 0
            const author = await User.findOne({_id: req.user.id})
            const blogs = await Blogs.find({author : author.name}).limit(6).skip(skip)
            res.status(200).send(blogs)
        }catch(e){
            res.status(500).send(e)
        }
    },
    login : async(req,res,next) => {
        const user = await User.findOne({name: req.body.name})
    
        if(!user) return res.status(500).send('no user found')
        const compare = await bcrypt.compare(req.body.password, user.password)
    
        if(!compare) return res.status(500).send('wrong password')
    
        const {password, ...data} = user._doc
        const token = jwt.sign({ id: user._id }, process.env.JWT)
    
        res.cookie('acces_token',token,{
            maxAge: 24 * 60 * 60 * 100,
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        }).status(200)
        .json(data)
    },
    logout : async(req,res,next) => {
        res.clearCookie('acces_token').send("CookieCleared")
        
    }
}