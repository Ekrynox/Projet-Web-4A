import express from 'express'
import helmet from 'helmet'

import DataBase from './db/db'
import loadUserRoute from './routes/users'

var hostname = 'localhost'
var port = 80
var api = '/api/'

const app = express()
const router = express.Router()
const db = new DataBase('./db.db')

loadUserRoute(api, router, db)

app.use(router)

app.use(helmet())
app.listen(port, hostname, function () {
  console.log('Server Start: ' + hostname + ':' + port + '\n')
})
