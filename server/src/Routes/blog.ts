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
  wrap(async (req, res) => {
    const postSelected = await Blog.findById(req.params._id)
    res.status(200).send(postSelected)
  })
)

routerBlog.post('/add', authorizeRoles, authenticateJWT, async (req, res) => {
  const { title, description, image, read_time, date, category, author } =
    req.body
  try {
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
  } catch (error) {
    res.status(400).json({ error: 'Post already exists' })
  }
})
routerBlog.put(
  '/:id/update',
  authorizeRoles,
  authenticateJWT,
  async (req, res) => {}
)
routerBlog.delete(
  '/:id/delete',
  authorizeRoles,
  authenticateJWT,
  async (req, res) => {}
)
