import { Router } from 'express'
import { Blog } from '../Models/blog.model'
import { authorizeRoles } from '../Middleware/roles'
import { authenticateJWT } from '../Middleware/Auth'
export const routerBlog = Router()

routerBlog.get('/post', async (req, res) => {})
routerBlog.get('/post/:id', async (req, res) => {})

routerBlog.post(
  '/post/add',
  authorizeRoles,
  authenticateJWT,
  async (req, res) => {
    const { title, description, image, read_time, date } = req.body
    try {
      const newPost = new Blog({
        title,
        description,
        image,
        read_time,
        date,
      })
      await newPost.save()
      res.status(201).json({ message: 'Post added successfully' })
    } catch (error) {
      res.status(400).json({ error: 'Post already exists' })
    }
  }
)
routerBlog.put(
  '/post/:id/update',
  authorizeRoles,
  authenticateJWT,
  async (req, res) => {}
)
routerBlog.delete(
  '/post/:id/delete',
  authorizeRoles,
  authenticateJWT,
  async (req, res) => {}
)
