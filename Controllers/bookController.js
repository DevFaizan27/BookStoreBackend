import { Book } from "../models/bookModel.js";


//add a book
export const addBook=async(req,res)=>{
    const {title,author,publishYear}=req.body;
    try {
        if(!title||!author||!publishYear){
            return res.status(400).send({message:"Send all required fields:title,author,publishYear "})
        }
        const newBook={
            title,
            author,
            publishYear,
            user:req.userId,
        }
        const book=await Book.create(newBook)
      
        return res.status(201).send(book)
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message})
    }
}


//get all book
export const getAllBooks=async(req,res)=>{
    try {
        const books=await Book.find({user:req.userId});
        return res.status(200).json({
            count:books.length,
            data:books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
    }
}

//get single book
export const getBookById=async(req,res)=>{
    try {
        const {id}=req.params;

        const book=await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
    }
}

//update a book
export const updateBook=async(req,res)=>{
    try {
        if(!req.body.title||!req.body.author||!req.body.publishYear){
            return res.status(400).send({message:"Send all required fields:title,author,publishYear "})
        }
        const {id}=req.params;

        const result=await Book.findByIdAndUpdate(id,req.body)
        if(!result){
            return res.status(404).send({message:"Book not found"})
        }
        if (result.user.toString() !== req.userId) {
            return res.status(401).send("Not Allowed");
        }
        return res.status(200).send({message:"Book Updated Succesfully"})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
}

//delete a book
export const deleteBook=async(req,res)=>{
    try {
        const {id}=req.params;
        const result=await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).send({message:"Book not found"})
        }
        if (result.user.toString() !== req.userId) {
            return res.status(401).send("Not Allowed");
        }
        res.status(200).send({message:"Book deleted Succesfully"})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
}