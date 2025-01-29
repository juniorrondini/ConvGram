import { NextResponse } from "next/server"
import { Server as SocketIOServer } from "socket.io"
import type { NextApiRequest } from "next"

let io: SocketIOServer

export async function GET(req: NextApiRequest) {
  if (!io) {
    console.log("Initializing Socket.IO server")
    // @ts-ignore
    io = new SocketIOServer(3001, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    })

    io.on("connection", (socket) => {
      console.log("New client connected")

      socket.on("join-chat", (chatId: string) => {
        socket.join(chatId)
        console.log(`User joined chat: ${chatId}`)
      })

      socket.on("leave-chat", (chatId: string) => {
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
  } else {
    console.log("Socket.IO server already running")
  }

  return NextResponse.json({ success: true })
}

