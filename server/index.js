//imports ...
const express = require('express') ; 
const cors=require('cors') ; 
const dotenv = require('dotenv') ; 
const UserRoutes  = require ('./Routes/User');
const cookieParser = require('cookie-parser') ; 
const { sqlConnection } = require('./Connection/sqlConnection');


//.env handle...
dotenv.config() ; 

//declarations...
const app = express() ; 
const PORT = process.env.PORT_NUMBER || 5000 ; 

//DatabaseConnection...
sqlConnection() ; 


// middlewares...
app.use(express.json()) ; 
app.use(cors()) ; 
app.use(express.urlencoded({extended:true})) ; 
app.use(cookieParser()) ; 



//api endpoints...

app.use('/api/user',UserRoutes) ; 



//server run ...

app.listen(PORT,()=>{
    console.log(`Server is Running on Port Number : ${PORT}`)
})