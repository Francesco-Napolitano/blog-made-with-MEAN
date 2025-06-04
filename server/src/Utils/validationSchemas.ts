export const createUserValidationSchema = {
  email: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: 'Please provide a valid email address.',
    },
    notEmpty: {
      errorMessage: 'Email cannot be empty',
    },
    isString: {
      errorMessage: 'Username must be a string!',
    },
    normalizeEmail: true,
    trim: true,
  },
}
