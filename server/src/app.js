import express from 'express'

var hostname = 'localhost'
var port = 80

const app = express()
const router = express.Router()

app.use(router)
app.listen(port, hostname, function () {
  console.log('Server Start: ' + hostname + ':' + port + '\n')
})
