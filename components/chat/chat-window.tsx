"use client"

import { useState, useEffect, useRef } from "react"
import { useSession } from "@supabase/auth-helpers-react"
import { Send, ImageIcon, Smile } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  const sendMessage = async (e: React.FormEvent) => {

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
            // onKeyDown={(e) => {
            //   if (e.key === "Enter" && !e.shiftKey) {
            //     e.preventDefault()
            //     sendMessage(e)
            //   } else {
            //     handleTyping()
            //   }
            // }}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" className="shrink-0">
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>

      {/* {showGifPicker && <GifPicker onSelectGif={handleSelectGif} onClose={() => setShowGifPicker(false)} />} */}
    </div>
  )
}

