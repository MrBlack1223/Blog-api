/*expressStuff*/
const express = require('express')
const app = express();
/*dbStuff*/
const mongoose = require('mongoose')
const config = require('config')
const dbConfig = config.get('Blogs.dbConfig.dbname')
/*Schemas*/
const blogs = require('./Routes/blogs.js')
/*Cors*/ 
const cors = require('cors')

app.use(cors())
app.use(express.json())

mongoose.connect(dbConfig).then(()=>{ console.log('dbConnected')} )

app.use('/blogs',blogs)

app.listen('8888',()=>{
    console.log('server is running on port 8888')
});
