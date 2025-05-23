import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { router } from './Routes/auth'
import { routerBlog } from './Routes/blog'
import { errorHandler } from './Middleware/errorHandler'
import { rateLimit } from 'express-rate-limit'

dotenv.config()
const app = express()
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
const { ATLAS_URI } = process.env

if (!ATLAS_URI) {
  console.error(
    'No ATLAS_URI environment variable has been defined in config.env'
  )
  process.exit(1)
}

app.use(cors())
app.use(express.json())
app.use(limiter) //ora funziona ma se viene inserito al di sotto dell'ap.use('/post',..) SMETTE DI FUNZIONARE
// Routes
app.use('/api/auth', router)
app.use('/post', routerBlog)
app.use(errorHandler)

mongoose
  .connect(ATLAS_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error:', err))

app.listen(5200, () => {
  console.log(`Server is running on port http://localhost:5200...`)
})
