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
app.use(corsMiddleware())
// app.use(cors({
//     origin:'http://localhost:5173',
//     methods:['GET' ,' POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'],
// }))

//available book routes r
app.use('/books',bookRoute)
//user routes
app.use('/user',userRoute)

app.listen(process.env.PORT,()=>{
    console.log(`App Listining to port :${process.env.PORT}`);
})

