//imports ...
const express = require('express') ; 
const cors=require('cors') ; 
const dotenv = require('dotenv') ; 
const UserRoutes  = require ('./Routes/User');
const { sqlConnection } = require('./Connection/sqlConnection');
const {mongoDbConnection} = require('../server/Connection/mongoConnection') ; 
const cookieParser = require('cookie-parser') ; 
const bodyParser = require('body-parser');
const path = require("path")

//.env handle...
dotenv.config() ; 

//declarations...
const app = express() ; 
const PORT = process.env.PORT_NUMBER || 5000 ; 
const mongoUrl=process.env.MONGO_URL ; 

//DatabaseConnection...
sqlConnection() ; 
mongoDbConnection(mongoUrl)


// middlewares...
app.use(express.json({limit:'10mb'})) ; 
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["POST,'GET","PUT"] , 
    credentials:true , 
})) ; 
app.use(express.urlencoded({limit:'10mb',extended:true})) ; 
app.use(cookieParser()) ; 
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));


//api endpoints...

app.use('/api/user',UserRoutes) ; 



//server run ...

app.listen(PORT,()=>{
    console.log(`Server is Running on Port Number : ${PORT}`)
})