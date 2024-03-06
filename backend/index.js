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

// var corsOptions = {
//     origin: "http://localhost:5173",
//     credentials: true
// }
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())


connectDB()

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
})
const users = []

io.on("connection", (socket) => {
    console.log("server connected..")

    socket.on("addUser", ({ userId }) => {
        const userExists = users.find((u) => userId === u.userId)
        if (!userExists) {
            console.log("UserAdded", userId)
            users.push({ userId, socketId: socket.id })
        }
        console.log(users)
    })
    socket.on("newMessage", (message) => {
        console.log(message)
        const receiver = users.find(u => u.userId === message.to)
        console.log("Users", users)
        console.log("receiver", receiver)
        if (receiver) {
            io.to(receiver.socketId).to(socket.id).emit(message)
        }

    })
})


const port = process.env.PORT || 3000;

app.use('/api', userRouter)
app.use('/api', authRouter)
app.use('/api', conversationRouter)
app.use('/api', messageRouter)

httpServer.listen(port, () => {
    console.log("Server connected...")
})

