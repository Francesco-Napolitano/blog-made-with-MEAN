const allowedRoles: String[] = ['ADMIN', 'AUTHOR']

export const authorizeRoles = (req, res, next) => {
  const user = req.user
  console.log('Accessp con email e password', user)
  if (!user || !allowedRoles.includes(user.role)) {
    console.log(user)
    return res.status(403).json({ error: 'Access sesso' })
  }
  next() // questo parametro serve al middleware Express per far passare il controllo al middleware o funzione successiva
}
