import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connection.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import taskRoute from "./routes/taskRoute.js";
import cookieParser from "cookie-parser";

dotenv.config({
    path:".env"
});

connectDB();

const app = express();

app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin:"http://localhost:3000",
    credentials :true
}
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/task", taskRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT} `)
})