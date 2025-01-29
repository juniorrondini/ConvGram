"use client"

import { useState, useEffect, useRef } from "react"
import { useSession } from "@supabase/auth-helpers-react"
import { Send, ImageIcon, Smile } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { socketClient } from "@/lib/socket-client"
import { GifPicker } from "./gif-picker"

interface Message {
  id: string
  content: string
  senderId: string
  senderName: string
  chatId: string
  createdAt: string
  type: "text" | "gif"
}

interface ChatWindowProps {
  chatId: string
  recipientName: string
  recipientAvatar?: string
}

export function ChatWindow({ chatId, recipientName, recipientAvatar }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showGifPicker, setShowGifPicker] = useState(false)
  const session = useSession()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [socket, setSocket] = useState(socketClient.getSocket())

  useEffect(() => {
    // Ensure the socket is connected when the component mounts
    socketClient.connect()
    setSocket(socketClient.getSocket())

    return () => {
      // Disconnect the socket when the component unmounts
      socketClient.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!socket || !chatId) return

    const handleConnect = () => {
      console.log("Socket connected successfully")
      socket.emit("join-chat", chatId)
    }

    const handleDisconnect = (reason: string) => {
      console.log("Socket disconnected:", reason)
    }

    const handleNewMessage = (message: Message) => {
      console.log("New message received:", message)
      setMessages((prev) => [...prev, message])
      scrollToBottom()
    }

    const handleTyping = (username: string) => {
      setIsTyping(true)
      const timer = setTimeout(() => setIsTyping(false), 1000)
      return () => clearTimeout(timer)
    }

    socket.on("connect", handleConnect)
    socket.on("disconnect", handleDisconnect)
    socket.on("new-message", handleNewMessage)
    socket.on("user-typing", handleTyping)

    return () => {
      socket.off("connect", handleConnect)
      socket.off("disconnect", handleDisconnect)
      socket.off("new-message", handleNewMessage)
      socket.off("user-typing", handleTyping)
      socket.emit("leave-chat", chatId)
    }
  }, [socket, chatId])

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if ((!newMessage.trim() && !showGifPicker) || !socket || !session?.user) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: session.user.id,
      senderName: session.user.email || "Anonymous",
      chatId,
      createdAt: new Date().toISOString(),
      type: "text",
    }

    try {
      socket.emit("send-message", message, (error: any) => {
        if (error) {
          console.error("Error sending message:", error)
        } else {
          setMessages((prev) => [...prev, message])
          setNewMessage("")
          scrollToBottom()
        }
      })
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  const handleTyping = () => {
    if (!socket || !session?.user) return
    socket.emit("typing", { chatId, username: session.user.email })
  }

  const handleSelectGif = (gifUrl: string) => {
    if (!socket || !session?.user) return

    const message: Message = {
      id: Date.now().toString(),
      content: gifUrl,
      senderId: session.user.id,
      senderName: session.user.email || "Anonymous",
      chatId,
      createdAt: new Date().toISOString(),
      type: "gif",
    }

    socket.emit("send-message", message, (error: any) => {
      if (error) {
        console.error("Error sending GIF:", error)
      } else {
        setMessages((prev) => [...prev, message])
        scrollToBottom()
      }
    })

    setShowGifPicker(false)
  }

  return (
    <div className="flex flex-1 flex-col h-[100dvh]">
      {/* Chat Header */}
      <div className="flex items-center border-b p-4 h-16 shrink-0">
        <Avatar className="h-8 w-8">
          <AvatarImage src={recipientAvatar} />
          <AvatarFallback>{recipientName[0]}</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <div className="font-semibold">{recipientName}</div>
          {isTyping && <div className="text-sm text-muted-foreground">typing...</div>}
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4 h-[calc(100vh-8rem)]">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === session?.user?.id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.senderId === session?.user?.id ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.type === "text" ? (
                  <div className="text-sm break-words">{message.content}</div>
                ) : (
                  <img src={message.content || "/placeholder.svg"} alt="GIF" className="max-w-full h-auto rounded" />
                )}
                <div className="mt-1 text-xs opacity-70">{new Date(message.createdAt).toLocaleTimeString()}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="border-t p-4 h-16">
        <div className="flex gap-2 h-full">
          <Button type="button" variant="ghost" size="icon" className="shrink-0" onClick={() => setShowGifPicker(true)}>
            <Smile className="h-5 w-5" />
            <span className="sr-only">Add GIF</span>
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                sendMessage(e)
              } else {
                handleTyping()
              }
            }}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" className="shrink-0">
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>

      {showGifPicker && <GifPicker onSelectGif={handleSelectGif} onClose={() => setShowGifPicker(false)} />}
    </div>
  )
}

