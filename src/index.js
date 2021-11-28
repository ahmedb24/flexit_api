import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import comments from './controllers/comment/route'
import users from './controllers/user/route'
import notFound from './controllers/not-found'

import makeCallback from './express-callback'

dotenv.config()

const apiRoot = process.env.FLEXIT_API_ROOT
const app = express()
app.use(bodyParser.json())
// TODO: figure out DNT compliance.
app.use((_, res, next) => {
  res.set({ Tk: '!' })
  next()
})

app.use(`${apiRoot}/comments`, comments);
app.use(`${apiRoot}/users`, users);
app.use(makeCallback(notFound))


  // listen for requests
  app.listen(3000, () => {
    console.log('Server is listening on port 3000')
  })


export default app
