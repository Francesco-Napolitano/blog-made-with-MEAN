import { Router } from 'express'
import { Blog } from '../Models/blog.model'
import { authorizeRoles } from '../Middleware/roles'
import { authenticateJWT } from '../Middleware/Auth'
import { isAdmin } from '../Middleware/admin'
import { sanitizer } from '../Middleware/sanitizer'
import { query } from 'express-validator'
export const routerBlog = Router()

//sarebbe possibile anche inserirla in un altro file in una cartella Utils e chiamare
//il file ad esempio tryCatch.ts
const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next)
// const asyncWrapper = (fn) => { QUESTA è LA STESSA VERSIONE MA PIù LUNGA
//   return async (req, res, next) => { //fn sta per FUNCTION
//     try {
//       await fn(req, res, next);
//     } catch (error) {
//       next(error); // Passes error to error handling middleware
//     }
//   };
// };

routerBlog.get(
  '/',
  wrap(async (req, res) => {
    const allPosts = await Blog.find()
    res.status(200).json(allPosts)
  })
)

routerBlog.get(
  '/:_id',
  wrap(async (req, res) => {
    const postSelected = await Blog.findById(req.params._id)
    res.json(postSelected)
  })
)

routerBlog.post(
  '/add',
  authenticateJWT,
  authorizeRoles,
  sanitizer,
  wrap(async (req, res) => {
    const { title, description, image, read_time, date, category, author } =
      req.body
    const newPost = new Blog({
      title,
      description,
      image,
      read_time,
      date,
      category,
      author,
    })
    await newPost.save()
    res.status(201).json({ message: 'Post added successfully' })
  })
)
routerBlog.put(
  '/:_id/update',
  authenticateJWT,
  isAdmin,
  sanitizer,
  wrap(async (req, res) => {
    const id: Object = req.params._id
    const { title, description, image, read_time, date, category, author } =
      req.body
    const updatedPost = {
      title,
      description,
      image,
      read_time,
      date,
      category,
      author,
    }
    await Blog.findByIdAndUpdate(id, updatedPost)
    console.log('Cosa hai modificato: ', updatedPost)
    res.status(200).send(updatedPost)
  })
)

routerBlog.delete(
  '/:_id/delete',
  authenticateJWT,
  isAdmin,
  wrap(async (req, res) => {
    const deletedPost = await Blog.findByIdAndDelete(req.params._id)
    res.status(200).send(deletedPost)
  })
)
