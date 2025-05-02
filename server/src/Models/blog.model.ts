import mongoose from 'mongoose'

const blogModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    read_time: { type: String, required: true },
    date: { type: new Date('<YYYY-mm-dd>'), required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

export const Blog = mongoose.model('Blog', blogModel)
// categoria:
//   | 'Informatica'
//   | 'Crescita Personale'
//   | 'Lavoro'
//   | 'Consigli'
//   | 'Riflessioni'
