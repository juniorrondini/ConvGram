import { io, type Socket } from "socket.io-client"

class SocketClient {
  private static instance: SocketClient
  private socket: Socket | null = null

  private constructor() {
    this.initSocket()
  }

  private initSocket() {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001"

    this.socket = io(socketUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      transports: ["websocket", "polling"],
    })

    this.socket.on("connect", () => {
      console.log("Connected to Socket.IO server")
    })

    this.socket.on("connect_error", (error: Error) => {
      console.error("Socket connection error:", error.message)
    })

    this.socket.on("disconnect", (reason: string) => {
      console.log("Disconnected from Socket.IO server:", reason)
    })
  }

  public static getInstance(): SocketClient {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient()
    }
    return SocketClient.instance
  }

  public getSocket(): Socket | null {
    return this.socket
  }

  public connect() {
    if (this.socket && !this.socket.connected) {
      this.socket.connect()
    }
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}

export const socketClient = SocketClient.getInstance()

