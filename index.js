import express from "express";
import 'dotenv/config';
import connectToMongo from "./database/db.js";
import bookRoute from './routes/bookRoute.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors';
import corsMiddleware from "./middleware/corsMiddleware.js";


const app=express();

//connecting database
connectToMongo()

//apply middleware for parsing request body
app.use(express.json())

//middleware to handle cors policy
// app.use(cors())


//available book routes r
app.use('/books',cors(),bookRoute)
//user routes
app.use('/user',cors(),userRoute)

app.listen(process.env.PORT,()=>{
    console.log(`App Listining to port :${process.env.PORT}`);
})

