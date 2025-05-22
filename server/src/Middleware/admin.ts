const allowedRoles: String[] = ['ADMIN']

export const isAdmin = (req, res, next) => {
  const user = req.user
  console.log('Accesso con email e password', user)
  if (!user || !allowedRoles.includes(user.role)) {
    console.log(user)
    return res.status(403).json({ error: 'Access denied' })
  }
  next() // questo parametro serve al middleware Express per far passare il controllo al middleware o funzione successiva
}
