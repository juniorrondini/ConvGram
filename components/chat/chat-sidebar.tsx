"use client"

import { useState } from "react"
import { Search, UserPlus } from "lucide-react"

import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Chat {
  id: string
  recipientName: string
  recipientAvatar?: string
  lastMessage: string
  timestamp: string
  unreadCount: number
}

interface ChatSidebarProps {
  chats: Chat[]
  onSelectChat: (chatId: string) => void
  selectedChatId?: string
  onAddUser: () => void
}

export function ChatSidebar({ chats, onSelectChat, selectedChatId, onAddUser }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChats = chats.filter((chat) => chat.recipientName.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex h-screen w-80 flex-col border-r">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon" onClick={onAddUser}>
            <UserPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-2">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted ${
                selectedChatId === chat.id ? "bg-muted" : ""
              }`}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={chat.recipientAvatar} />
                <AvatarFallback>{chat.recipientName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{chat.recipientName}</span>
                  <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="truncate text-sm text-muted-foreground">{chat.lastMessage}</span>
                  {chat.unreadCount > 0 && (
                    <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

