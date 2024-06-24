const mongoose = require('mongoose') ; 



async function mongoDbConnection(url){
    try{
        await mongoose.connect(url , { useNewUrlParser: true , useUnifiedTopology: true });
        console.log("MongoDb Connected!") ; 

    }catch(err){
        console.log(err) ; 
    }

}


module.exports={
    mongoDbConnection,
}








module.exports={
    mongoDbConnection , 
}