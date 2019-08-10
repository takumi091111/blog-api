import express from 'express'
import { ALLOW_HOSTS } from './env'

const app = express()
app.set('trust proxy', true)

app.use((req, res, next) => {
  const origin = req.headers.origin && req.headers.origin.toString()
  const host = origin || `${req.protocol}://${req.hostname}`

  if (!ALLOW_HOSTS.includes(host)) {
    res.status(403)
    return res.send({ message: 'Host not allowed.' })
  }

  res.header('Access-Control-Allow-Origin', host)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-Csrftoken, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET')
  res.header('Access-Control-Max-Age', '3600')
  next()
})

export {
  app
}
