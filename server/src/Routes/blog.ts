import { Router } from 'express'
import { Blog } from '../Models/blog.model'
import { authorizeRoles } from '../Middleware/roles'
import { authenticateJWT } from '../Middleware/Auth'
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
  '/:id',
  wrap(async (id) => {
    const postSelected = await Blog.findById(id)
    console.log(postSelected)
  })
)

routerBlog.post(
  '/add',
  authenticateJWT,
  authorizeRoles,
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
  '/:id/update',
  authenticateJWT,
  authorizeRoles,
  wrap(async (req, res) => {
    const id = req.params._id
    console.log(id)

    let updatedBlog = {}
    updatedBlog = req.body.title
    updatedBlog = req.body.description
    updatedBlog = req.body.image
    updatedBlog = req.body.read_time
    updatedBlog = req.body.date
    updatedBlog = req.body.category
    updatedBlog = req.body.author
    await Blog.findByIdAndUpdate(id, updatedBlog)
    res.status(200).send(updatedBlog)
  })
)
routerBlog.delete(
  '/:id/delete',
  authorizeRoles,
  authenticateJWT,
  async (req, res) => {}
)
