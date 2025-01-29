import type { Server as NetServer } from "http"
import { Server as SocketIOServer } from "socket.io"
import type { NextApiResponse } from "next"

export type NextApiResponseServerIO = NextApiResponse & {
  socket: any & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}

export const initSocket = (res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const io = new SocketIOServer(res.socket.server)
    res.socket.server.io = io

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id)

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
        console.log("Client disconnected:", socket.id)
      })
    })
  }
  return res.socket.server.io
}

