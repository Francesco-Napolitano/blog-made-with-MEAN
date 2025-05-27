import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'

export const sanitizer = (req, res, next) => {
  const window = new JSDOM('').window
  const purify = DOMPurify(window)
  if (req.body.content) {
    req.body.content = purify.sanitize(req.body.content)
  }
  next()
}
