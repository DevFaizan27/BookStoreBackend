import express from 'express';
import { addBook, deleteBook, getAllBooks, getBookById, updateBook } from '../Controllers/bookController.js';
import fetchUser from '../middleware/fetchUser.js';

const router=express.Router()

//add the book
router.post('/',fetchUser,addBook)

//Route to get all books from database
router.get('/',fetchUser,getAllBooks)


//Route to get one book by id  from database
router.get('/:id',fetchUser,getBookById)


//Route to update the book
router.put('/:id',fetchUser,updateBook)

//Route to delete a book
router.delete('/:id',fetchUser,deleteBook)


export default router