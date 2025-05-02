import mongoose from 'mongoose'

const blogModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    read_time: { type: String, required: true },
    date: { type: Date, required: true },
    category: {
      type: String,
      enum: [
        'Informatica',
        'Crescita Personale',
        'Lavoro',
        'Consigli',
        'Riflessioni',
      ],
      required: true,
    },
    author: { type: String, required: true },
  },
  { timestamps: true }
)

export const Blog = mongoose.model('Blog', blogModel)
