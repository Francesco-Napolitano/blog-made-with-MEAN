export const errorHandler = (error, req, res, next) => {
  if (error.toString().includes('CastError: Cast to ObjectId failed for value'))
    // error handler for GET('/:_id')
    res.status(400).json({
      error: 'Provide a valid id ( post/6814rt0691141ab2m40d )',
    })
  return res.status(400).send(error.message)
}
