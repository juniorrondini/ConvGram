const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")
const { Server } = require("socket.io")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  })

  io.on("connection", (socket) => {
    console.log("New client connected")

    socket.on("join-chat", (chatId) => {
      socket.join(chatId)
      console.log(`User joined chat: ${chatId}`)
    })

    socket.on("leave-chat", (chatId) => {
      socket.leave(chatId)
      console.log(`User left chat: ${chatId}`)
    })

    socket.on("send-message", (message) => {
      io.to(message.chatId).emit("new-message", message)
    })

    socket.on("typing", ({ chatId, username }) => {
      socket.to(chatId).emit("user-typing", username)
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected")
    })
  })

  const PORT = process.env.PORT || 3000
  server.listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`)
  })
})

