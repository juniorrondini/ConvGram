"use client";
import { useEffect, useState } from "react";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ChatWindow } from "@/components/chat/chat-window";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "../lib/supabaseClient";

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>();
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [chats, setChats] = useState<any[]>([]); // Inicializando como array vazio
  const [user, setUser] = useState<any>(); // Inicializando como array vazio

  useEffect(() => {
    const data = localStorage.getItem('sb-ttibuajiyhfrsdyqsqsm-auth-token');
    console.log(data);
    setUser(data);
    
    const fetchChats = async () => {
      const { data, error } = await supabase
        .from("user_chats")
        .select("*")
        .order("last_message_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar chats:", error);
      } else {
        setChats(data || []);
      }
    };

    fetchChats();
  }, []);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  const handleNewUser = async () => {
    if (!newUserEmail) return;

    try {
      // 1️⃣ Check if user exists in `profiles` table
      const { data: recepientUser, error: userError } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", newUserEmail) // Assuming username is used for lookup
        .single();

      if (userError || !recepientUser) {
        console.error("User not found:", userError);
        alert("User not found!");
        return;
      }

      // 2️⃣ Create a new chat with the found user
      const { data: newChat, error: chatError } = await supabase
        .from("chats")
        .insert([
          {
            user_id: user.id, // Replace with actual logged-in user ID
            recipient_id: recepientUser.id, // ID of the found user
            last_message_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (chatError) {
        console.error("Error creating chat:", chatError);
        alert("Failed to create chat!");
        return;
      }

      // 3️⃣ Update local state with new chat
      setChats((prevChats) => [newChat, ...prevChats]);

      // 4️⃣ Close modal and reset input
      setIsAddUserDialogOpen(false);
      setNewUserEmail("");
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden">
      <ChatSidebar
        chats={chats}
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
                placeholder="Enter username"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="col-span-3"
              />
              <Button onClick={handleNewUser}>Add</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
