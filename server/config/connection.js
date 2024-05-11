import mongoose from "mongoose";

const connectDB = async() => {
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Connected to mongoDB");
    }).catch((error)=>{
        console.log(error);
    })
};

export default connectDB;