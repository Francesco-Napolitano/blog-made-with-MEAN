export const errorHandler = (error, req, res, next) => {
  console.log(error)
  return res.status(400).send(error.message)
}
