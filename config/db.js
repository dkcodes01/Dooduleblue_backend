const mongoose=require('mongoose');
const connectDB=async()=>{
    const MONGO_URI=process.env.mongoose;
    if(!MONGO_URI){
        console.error('Error:No url is deefined in .env')
        process.exit(1)
    }
    try{
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB successfully')
    }catch(err){
        console.error('Failed to connect to MongoDB:',err.message);
        process.exit(1)
    }
}
module.exports=connectDB;