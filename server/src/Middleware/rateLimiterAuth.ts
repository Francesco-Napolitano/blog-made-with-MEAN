import { rateLimit } from 'express-rate-limit'

export const rateLimiterAuth = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24h
  limit: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
