const express = require('express')

export const routerBlog = express.Router()

routerBlog.post('/post/add', async (req,res)=>{
   const {name,email,password} = req.body
   try{
      const newPost = new 
   }
})
