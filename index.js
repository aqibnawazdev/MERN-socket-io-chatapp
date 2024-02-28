const express = require('express')
const db = require('./db')
require('dotenv').config()
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')
const http = require("http")
const { Server } = require("socket.io")
const httpServer = http.createServer(app)

const io = new Server(httpServer, {})

io.on("connection", (socket) => {
    console.log("User connected...")
})

app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

httpServer.listen(port, () => {
    console.log("Server connected...")
})
db()
