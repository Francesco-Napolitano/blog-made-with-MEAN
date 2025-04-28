import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const userRouter = express.Router();

//rotta per la registrazione --- SIGNUP ROUTE

userRouter.post("/signup", (req,res,next) => {
   
})