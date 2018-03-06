import * as fs from 'fs'
import * as db from 'webscaledb'

const DB_NAME = 'data/config.json'

export default async function init() {
  console.log('Initialising configuration...')
  try {
    fs.statSync(DB_NAME)
  } catch (ex) {
    const cfg = {
      token: process.env.API_TOKEN,
      rebase: new Date().toISOString()
    }

    fs.writeFileSync(DB_NAME, JSON.stringify(cfg, null, 2))
  }

  await restoreAsync()
  const cfg = db.get()

  if (!cfg.token) {
    const token = process.env.API_TOKEN
    if (token) {
      db.set('token', token)
      return
    }

    console.error('API_TOKEN not set')
    process.exit(1)
  }
}

function restoreAsync() {
  return new Promise<void>((resolve, reject) => {
    db.restore(DB_NAME, err => {
      if (err) {
        return reject(err)
      }

      return resolve()
    })
  })
}

export function backupAsync() {
  return new Promise<void>((resolve, reject) => {
    db.backup(DB_NAME, err => {
      if (err) {
        return reject(err)
      }

      return resolve()
    })
  })
}
