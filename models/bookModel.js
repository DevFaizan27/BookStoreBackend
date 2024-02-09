import mongoose from "mongoose";

const {ObjectId}=mongoose.Schema.Types

//creating schema
const bookSchema=mongoose.Schema({
    user:{
        type:ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    }, 
    publishYear:{
        type:String,
        required:true,
    }
},
{
    timestamps:true,
}
)

export const Book=mongoose.model('book',bookSchema)
