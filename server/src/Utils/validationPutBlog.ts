// validationPostBlog.ts
import { checkSchema } from 'express-validator'

export const postBlogValidationSchema = checkSchema({
  title: {
    notEmpty: {
      errorMessage: 'Title cannot be empty.',
    },
    isLength: {
      options: { min: 3, max: 100 },
      errorMessage: 'Title must be between 3 and 100 characters.',
    },
  },
  description: {
    notEmpty: {
      errorMessage: 'Description cannot be empty.',
    },
    isLength: {
      options: { min: 10, max: 500 },
      errorMessage: 'Description must be between 10 and 750 characters.',
    },
  },
  image: {
    notEmpty: {
      errorMessage: 'Image URL cannot be empty.',
    },
    isURL: {
      options: {
        protocols: ['http', 'https'],
        require_tld: true,
        require_protocol: true,
      },
      errorMessage: 'Image must be a valid URL (http or https).',
    },
  },
  read_time: {
    notEmpty: {
      errorMessage: 'Read time cannot be empty.',
    },
    isString: {
      errorMessage: 'Read time must be a string!',
    },
    isLength: {
      options: { min: 3, max: 50 },
      errorMessage: 'Read time must be between 3 and 50 characters.',
    },
  },
  date: {
    notEmpty: {
      errorMessage: 'Date cannot be empty.',
    },
    isISO8601: {
      options: { strict: true },
      errorMessage: 'Date must be a valid ISO-8601 date (YYYY-MM-DD).',
    },
    toDate: true,
  },
  category: {
    notEmpty: {
      errorMessage: 'Category cannot be empty.',
    },
    isIn: {
      options: [
        [
          'Informatica',
          'Crescita Personale',
          'Lavoro',
          'Consigli',
          'Riflessioni',
        ],
      ],
      errorMessage:
        'Category must be one of: Informatica, Crescita Personale, Lavoro, Consigli, Riflessioni.',
    },
  },
  author: {
    notEmpty: {
      errorMessage: 'Author cannot be empty.',
    },
    isLength: {
      options: { min: 3, max: 50 },
      errorMessage: 'Author must be between 3 and 50 characters.',
    },
  },
})
