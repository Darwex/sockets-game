const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', function (req, res) {
  res.sendFile('/Users/vrsek/Documents/sockets-game/client/index.html')
})
app.use(express.static('node_modules'))
app.use(express.static('client'))

console.log('server starting')

io.on('connection', client => {
  client.on('event', data => {})
  client.on('connection', socket => {
    console.log('a user connected')
    console.log(socket)
  })
  client.on('message', socket => {
    console.log(socket)
    io.emit('broadcast', socket)
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})