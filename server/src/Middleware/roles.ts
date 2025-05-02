const allowedRoles: String[] = ['ADMIN', 'AUTHOR']

export const authorizeRoles = (req, res, next) => {
  const user = req.user
  if (!user || allowedRoles.includes(user.role)) {
    return res.status(403).json({ error: 'Access denied' })
  }
  next() // questo parametro serve al middleware Express per far passare il controllo al middleware o funzione successiva
}
