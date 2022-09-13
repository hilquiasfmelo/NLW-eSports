import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'

const app = express()

app.use(express.json())

app.get('/nlw', (request, response) => {
  return response.json({ message: 'Welcome NLW eSports' })
})

app.listen(process.env.BASE_PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.BASE_PORT}`)
})