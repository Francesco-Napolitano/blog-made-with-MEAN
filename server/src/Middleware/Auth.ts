const jwt = require('jsonwebtoken')

export const authenticateJWT = (req, res, next) => {
  console.log('Authorization Header:', req.headers.authorization)
  const token = req.header('Authorization')?.split(' ')[1]
  console.log('Prova anche del token', token)
  if (!token)
    return res.status(401).json({ error: 'Access denied. No token provided.' })
  try {
    console.log('Qui ci arrivi?')
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decode
    console.log('Prova DECODE ', decode)
    next()
  } catch (error) {
    console.log("Dammi l'errore", error)
    res.status(400).json({ error: 'Invalid Token' })
  }
}
