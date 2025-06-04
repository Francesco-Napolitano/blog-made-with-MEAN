import { checkSchema } from 'express-validator'
import { User } from '../Models/user-model'

export const createUserValidationSchema = checkSchema({
  email: {
    isEmail: {
      errorMessage: 'Please provide a valid email address.',
    },
    notEmpty: {
      errorMessage: 'Email cannot be empty',
    },
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: 'Email must be at length 5-32.',
    },
    isString: {
      errorMessage: 'Email must be a string!',
    },
    normalizeEmail: true,
    trim: true,
    custom: {
      options: async (value) => {
        // Effettuiamo la ricerca nel database
        const existing = await User.findOne({ email: value })
        if (existing) {
          // Se troviamo un record, rifiutiamo con un messaggio di errore
          return Promise.reject('This email already exists.')
        }
        return true // altrimenti, validation ok
      },
    },
  },
  name: {
    notEmpty: {
      errorMessage: 'Username cannot be empty',
    },
    isLength: {
      options: {
        min: 2,
        max: 20,
      },
      errorMessage: 'Username must be at length 2-20.',
    },
    isString: {
      errorMessage: 'Username must be a string!',
    },
    matches: {
      options: /^[a-zA-Z0-9_]+$/,
      errorMessage: 'Username can use alfanumerics and underscore',
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'Password cannot be empty',
    },
    isLength: {
      options: {
        min: 6,
        max: 32,
      },
      errorMessage: 'Password must be at length 6-32.',
    },
    isString: {
      errorMessage: 'Password must be a string!',
    },
    matches: {
      options: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
      errorMessage:
        'Password must contain at least one uppercase letter, one number, and one special character.',
    },
    trim: true,
  },
})
