import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

import DataBase from './db/db'
import loadUserRoute from './routes/users'

var hostname = 'localhost'
var port = 80
var api = '/api/'

const app = express()
const router = express.Router()
const db = new DataBase('./db.db')

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())

loadUserRoute(api, router, db)
app.use(router)

app.listen(port, hostname, function () {
  console.log('Server Start: ' + hostname + ':' + port + '\n')
})
