import { checkSchema } from 'express-validator'

export const loginUserValidationSchema = checkSchema({
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
        max: 35,
      },
      errorMessage: 'Email must be at length 5-35.',
    },
    isString: {
      errorMessage: 'Email must be a string!',
    },
    normalizeEmail: true,
    trim: true,
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
