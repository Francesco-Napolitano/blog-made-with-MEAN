const express = require('express')
import { rateLimiterAuth } from '../Middleware/rateLimiterAuth'
import { sanitizer } from '../Middleware/sanitizer'
import { User } from '../Models/user-model'
import { validationResult, matchedData } from 'express-validator'
import { createUserValidationSchema } from '../Utils/validationSchemas'
import { loginUserValidationSchema } from '../Utils/validationLogin'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
export const router = express.Router()

// Register a new user
router.post(
  '/register',
  rateLimiterAuth,
  sanitizer,
  createUserValidationSchema,
  async (req, res) => {
    const data = matchedData(req)
    try {
      const newUser = new User({ ...data })
      await newUser.save()
      res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
      res.status(400).json({ error: 'User not registered' })
    }
  }
)

//Login user and generate JWT token
router.post(
  '/login',
  rateLimiterAuth,
  sanitizer,
  loginUserValidationSchema,
  async (req, res) => {
    const data = matchedData(req)
    const result = validationResult(req)
    const { email, password } = data
    try {
      const user = await User.findOne({ email })
      console.log(user)
      if (!user) return res.status(404).json({ error: 'User not found' })
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch)
        return res.status(401).json({ error: 'Invalid credentials' })

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: '3h',
        }
      )
      res.json({ token })
    } catch (error) {
      console.log(result.array())
      console.log(data)
      res.status(500).json({ error: 'cicciogamer' })
    }
  }
)
