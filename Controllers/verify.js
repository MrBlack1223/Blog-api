const jwt= require('jsonwebtoken')

module.exports = {
    verify : (req,res,next)=>{
        const accesToken = req.cookies.acces_token
        if(!accesToken) return res.status(500).json('no token')
        jwt.verify(accesToken, process.env.JWT, (error,user)=>{
            if(error) return res.status(500).json('wrong token')
            req.user = user
            next()
        })
    }
}
