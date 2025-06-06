import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { router } from './Routes/auth'
import { routerBlog } from './Routes/blog'
import { errorHandler } from './Middleware/errorHandler'
import { rateLimiter } from './Middleware/rateLimiter'

dotenv.config()
const app = express()
app.set('trust proxy', 1 /* number of proxies between user and server */)
const { ATLAS_URI } = process.env

if (!ATLAS_URI) {
  console.error(
    'No ATLAS_URI environment variable has been defined in config.env'
  )
  process.exit(1)
}

app.use(cors())
app.use(express.json())
app.use(rateLimiter) //ora funziona ma se viene inserito al di sotto dell'app.use('/post',..) SMETTE DI FUNZIONARE
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
