"use client"
import { useState } from "react";
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { ChatWindow } from "@/components/chat/chat-window"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Mock data - replace with real data from your Supabase database
const mockChats = [
  {
    id: "1",
    recipientName: "Alice Johnson",
    lastMessage: "See you tomorrow!",
    timestamp: "10:30 AM",
    unreadCount: 2,
    recipientAvatar: "/avatars/alice.jpg",
  },
  {
    id: "2",
    recipientName: "Bob Smith",
    lastMessage: "Thanks for the update",
    timestamp: "Yesterday",
    unreadCount: 0,
    recipientAvatar: "/avatars/bob.jpg",
  },
]

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>()
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [newUserEmail, setNewUserEmail] = useState("")

  const selectedChat = mockChats.find((chat) => chat.id === selectedChatId)

  const handleAddUser = () => {
    // Here you would typically make an API call to add the user
    console.log(`Adding user with email: ${newUserEmail}`)
    setIsAddUserDialogOpen(false)
    setNewUserEmail("")
  }

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden">
      <ChatSidebar
        chats={mockChats}
        onSelectChat={setSelectedChatId}
        selectedChatId={selectedChatId}
        onAddUser={() => setIsAddUserDialogOpen(true)}
      />
      <div className="flex-1 overflow-hidden">
        {selectedChat ? (
          <ChatWindow
            chatId={selectedChat.id}
            recipientName={selectedChat.recipientName}
            recipientAvatar={selectedChat.recipientAvatar}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">Select a chat to start messaging</p>
          </div>
        )}
      </div>
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="email"
                placeholder="Enter user email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="col-span-3"
              />
              <Button onClick={handleAddUser}>Add</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

