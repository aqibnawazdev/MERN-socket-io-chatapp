const express = require('express')
const connectDB = require('./config/connectDB')
require('dotenv').config()
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')
const http = require("http")
const { Server } = require("socket.io");
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const conversationRouter = require('./routes/conversationRouter');
const messageRouter = require('./routes/messageRouter');
const cookieParser = require('cookie-parser')


const httpServer = http.createServer(app)

var corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())



const io = new Server(httpServer, {})
io.on("connection", (socket) => {
    console.log("User connected...")
})



const port = process.env.PORT || 3000;

connectDB()
app.use('/api', userRouter)
app.use('/api', authRouter)
app.use('/api', conversationRouter)
app.use('/api', messageRouter)

httpServer.listen(port, () => {
    console.log("Server connected...")
})

