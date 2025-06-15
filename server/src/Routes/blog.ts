import { Router } from 'express'
import { Blog } from '../Models/blog.model'
import { authorizeRoles } from '../Middleware/roles'
import { authenticateJWT } from '../Middleware/Auth'
import { isAdmin } from '../Middleware/admin'
import { sanitizer } from '../Middleware/sanitizer'
import { matchedData, query, validationResult } from 'express-validator'
import { postBlogValidationSchema } from '../Utils/validationPostBlog'
export const routerBlog = Router()

const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next)

routerBlog.get(
  '/',
  wrap(async (req, res) => {
    const allPosts = await Blog.find()
    res.status(200).json(allPosts)
  })
)

routerBlog.get(
  '/:_id',
  query('_id').isString().notEmpty().isMongoId(),
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
  postBlogValidationSchema,
  async (req, res) => {
    const result = validationResult(req)
    const data = matchedData(req)
    try {
      const newPost = new Blog({
        ...data,
      })
      await newPost.save()
      res.status(201).json({ message: 'Post added successfully' })
    } catch (error) {
      console.log(result.array())
      console.log(data)
      res.status(400).json({ error: 'Post not added' })
    }
  }
)

routerBlog.put(
  '/:_id/update',
  authenticateJWT,
  isAdmin,
  sanitizer,
  postBlogValidationSchema,
  async (req, res) => {
    const result = validationResult(req)
    const data = matchedData(req)
    try {
      const id: Object = req.params._id
      await Blog.findByIdAndUpdate(id, data)
      console.log('Cosa hai modificato: ', data)
      res.status(200).send(data)
    } catch (error) {
      console.log(result.array())
      console.log(data)
      res.status(400).json({ error: 'Post not modified' })
    }
  }
)

routerBlog.delete(
  '/:_id/delete',
  authenticateJWT,
  isAdmin,
  query('_id').exists().withMessage('ID DO NOT EXISTS').isMongoId(),
  wrap(async (req, res) => {
    const deletedPost = await Blog.findByIdAndDelete(req.params._id)
    res.status(200).send(deletedPost)
  })
)
