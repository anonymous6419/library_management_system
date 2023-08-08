const mongoose = require('mongoose')
require('colors')
exports.dbConnection = async ()=>{
    try {
        const connectDb  = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true
        }).then(()=>{
            console.log("Database Connected".bgWhite.blue);
        }).catch(err=>{
            console.error(err+"".bgRed.blue) 
        })
    } catch (error) {
        console.error(error+"".bgRed.blue)
    }
}