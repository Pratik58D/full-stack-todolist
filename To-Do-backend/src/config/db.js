const mongoose =  require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const mongoUrl = process.env.MONGO_URI;

const connectionDb = async()=>{
    try{
        const conn = await mongoose.connect(mongoUrl);
        console.log(`Connected: ${conn.connection.host}`);


    } catch(error){
        console.log("failed",error)
        process.exit(1)

    }
}

module.exports = connectionDb;