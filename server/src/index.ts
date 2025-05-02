import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { User } from './Models/user-model'
import { router } from './Routes/auth'
import { auth } from './Middleware/Auth'

dotenv.config()
const app = express()
const { ATLAS_URI } = process.env

if (!ATLAS_URI) {
  console.error(
    'No ATLAS_URI environment variable has been defined in config.env'
  )
  process.exit(1)
}

app.use(cors())
app.use(express.json())
// Routes
app.use('/api/auth', router)

mongoose
  .connect(ATLAS_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error:', err))

app.listen(5200, () => {
  console.log(`Server is running on port http://localhost:5200...`)
})
