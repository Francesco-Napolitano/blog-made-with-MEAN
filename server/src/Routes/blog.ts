import { Router } from 'express'
import { Blog } from '../Models/blog.model'
import { authorizeRoles } from '../Middleware/roles'
import { authenticateJWT } from '../Middleware/Auth'
import { isValidObjectId } from 'mongoose'
export const routerBlog = Router()
const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next)
// const asyncWrapper = (fn) => { QUESTA è LA STESSA VERSIONE MA PIù LUNGA
//   return async (req, res, next) => {
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

routerBlog.get('/:id', async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res
      .status(400)
      .send(`There's no record with given id: ${req.params.id}`)
  Blog.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc)
    } else {
      console.log('Error in retriving data ', JSON.stringify(err))
    }
  })
})

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
