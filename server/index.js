//imports ...
const express = require('express') ; 
const cors=require('cors') ; 
const dotenv = require('dotenv') ; 
const UserRoutes  = require ('./Routes/User');
const { sqlConnection } = require('./Connection/sqlConnection');
const cookieParser = require('cookie-parser') ; 

//.env handle...
dotenv.config() ; 

//declarations...
const app = express() ; 
const PORT = process.env.PORT_NUMBER || 5000 ; 

//DatabaseConnection...
sqlConnection() ; 


// middlewares...
app.use(express.json()) ; 
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["POST,'GET"] , 
    credentials:true , 
})) ; 
app.use(express.urlencoded({extended:true})) ; 
app.use(cookieParser()) ; 



//api endpoints...

app.use('/api/user',UserRoutes) ; 



//server run ...

app.listen(PORT,()=>{
    console.log(`Server is Running on Port Number : ${PORT}`)
})