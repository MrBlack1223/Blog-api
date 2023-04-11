/*expressStuff*/
const express = require('express')
const app = express();
/*dbStuff*/
const mongoose = require('mongoose')
const config = require('config')
const dbConfig = config.get('Blogs.dbConfig.dbname')
/*Schemas*/
const blogs = require('./Routes/blogs.js')
const user = require('./Routes/user.js')
/*Cors*/ 
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(cookieParser())

mongoose.connect(dbConfig).then(()=>{ console.log('dbConnected')} )

app.use('/blogs',blogs)

app.use('/user', user)

app.listen('8888',()=>{
    console.log('server is running on port 8888')
});
