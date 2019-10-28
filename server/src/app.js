import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import session from 'express-session'

import DataBase from './db/db'
import loadAuthRoute from './routes/auth'
import loadFriendsRoute from './routes/friends'
import loadUsersRoute from './routes/users'
import loadMessagesRoute from './routes/messages'

var port = process.env.PORT || 80
var api = '/api/'

const app = express()
const router = express.Router()
const db = new DataBase('./db.db')

app.use(morgan('dev'))
app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(helmet.noCache())
app.set('trust proxy', 1)
app.use(session({
  secret: 'plrplhplrpzlqzf nnasasjxjvrvnr',
  resave: true,
  saveUninitialized: true
}))

loadAuthRoute(api, router, db)
loadFriendsRoute(api, router, db)
loadUsersRoute(api, router, db)
loadMessagesRoute(api, router, db)
app.use(router)
app.use(express.static('./static'))

app.listen(port, function () {
  console.log('Server Start on port: ' + port + '\n')
})
