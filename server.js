const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const router = require('./routes/route');
const Auth = require('./constraints/wrapper/verifytoken');


const app = express()
let a = dotenv.config();

console.log("===========>",a);

app.use('/api',router)

app.use(cors())
app.options('*',cors())
app.use(express.json())

if(process.env.project === 'development'){
    app.use(morgan('dev'))
}

mongoose.connect('mongodb://localhost:27017/miniproject',{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(err){
        console.log(`err: ${err}`)
    }else{
        console.log('db connected successfully')
    }
})
const PORT = process.env.PORT || 2121
const server = app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})

process.on('unhandledRejection',(err,promise)=>{
    console.log(`err: ${err}`)
    server.close(process.exit(1))
})
