import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config';

//login user controller
export const loginUser = async (req, res) => {
    const { email, password } = req.body
    
    try {
        //* Validation 
        if (!email || !password) {
            return res.status(400).send({ error: "All fields are required" })
        }

        //* Email Validation 
        if (!email.includes("@")) {
            return res.status(400).send({ error: "Please enter a valid email" })
        }

        //* Find Unique User with email
        const user = await User.findOne({ email });


        //* if user not exists with that email
        if (!user) {
            res.status(400).send({ error: "User Not Found" })
        }

        //* matching user password to hash password with bcrypt.compare()
        const doMatch = await bcrypt.compare(password, user.password)

        //* if match password then generate token 
        if (doMatch) {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
                expiresIn: '7d'
            })

            res.status(201).send({ token })
        }
        else {
            res.status(404).send({ error: 'Email And Password Not Found' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }

};

//signup user controller
export const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //* Validation
    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }

    //* Email Validation
    if (!email.includes("@")) {
      return res.status(400).send("Please enter a valid email");
    }

    //* Find Unique User with email
    const user = await User.findOne({ email });

    if (user) {
      res.status(400).send("User already exists");
    } else {
      //password hashing
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //* Save Data into database
      const newUser = { email, password: hashedPassword };

      await User.create(newUser);
      return res.status(201).send("Signup successfully!!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//Get  user details
export const getUser=async(req,res)=>{
    try {
        const userId = req.userId
        console.log("getuser Id", userId)
        const user = await User.findById(userId).select("-password")
        res.send(user)
        console.log("getuser", user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
}