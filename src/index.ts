import * as express from 'express'
import init from './config'
import api from './api'

const app = express()
app.use(api)

async function start() {
  await init()

  app.listen(3000, () => {
    console.log('Listening on port 3000')
  })
}

start()
