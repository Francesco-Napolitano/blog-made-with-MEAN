import { Router } from 'express'
import { Blog } from '../Models/blog.model'
export const routerBlog = Router()

routerBlog.get('/post', async (req, res) => {})
routerBlog.get('/post/:id', async (req, res) => {})

routerBlog.post('/post/add', async (req, res) => {
  const { title, description, image, read_time, date, author } = req.body
  try {
    const newPost = new Blog({
      title,
      description,
      image,
      read_time,
      date,
      author,
    })
    await newPost.save()
    res.status(201).json({ message: 'Post added successfully' })
  } catch (error) {
    res.status(400).json({ error: 'Post already exists' })
  }
})
routerBlog.put('/post/:id/update', async (req, res) => {})
routerBlog.delete('/post/:id/delete', async (req, res) => {})
