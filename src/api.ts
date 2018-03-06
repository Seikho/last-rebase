import { Router } from 'express'
import * as fs from 'fs'
import * as db from 'webscaledb'

const APP_ENV = process.env.APP_ENV
const template = getTemplate()

const router = Router()

const DAYS_IN_MS = 60 * 60 * 24 * 1000
const DATE = '$LAST_REBASE_DATE'
const COUNT = '$LAST_REBASE_DAYS'

router.get('/', (req, res) => {
  const { date, count } = getRebase()

  const html = (APP_ENV === 'prd' ? template : getTemplate())
    .replace(DATE, `${date.toDateString()} ${date.toTimeString()}`)
    .replace(COUNT, count.toString())

  res.write(html)
  res.end()
})

router.get('/rebase', (_, res) => {
  const { date, count } = getRebase()
  res.json({ date: date.toISOString(), count })
})

router.post('/rebase', (req, res) => {
  const providedToken = req.query.token
  const actualToken = db.get('token')

  if (providedToken !== actualToken) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  db.set('rebase', new Date().toISOString())
  res.status(200).json({ message: 'Successful' })
})

function getTemplate() {
  return fs.readFileSync('template.html').toString()
}

function getRebase() {
  const date = new Date(db.get('rebase'))
  const now = new Date()
  const count = Math.floor((now.valueOf() - date.valueOf()) / DAYS_IN_MS)

  return {
    date,
    count
  }
}

export default router
