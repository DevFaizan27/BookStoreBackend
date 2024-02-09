import express from 'express';
import { getUser, loginUser, signupUser } from '../Controllers/userController.js';
import fetchUser from '../middleware/fetchUser.js';


const router=express.Router()

//login route
router.post('/login',loginUser)

//signup route
router.post('/signup',signupUser)

//get user by id
router.get('/getuser',fetchUser,getUser)



export default router