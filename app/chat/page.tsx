"use client";
import { useEffect, useState } from "react";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ChatWindow } from "@/components/chat/chat-window";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "../lib/supabaseClient";

// Ícones do lucide-react
import { Sun, Moon, Monitor } from "lucide-react";

type ThemeMode = "system" | "light" | "dark";

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>();
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [chats, setChats] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  // Estado para gerenciar o tema atual
  const [theme, setTheme] = useState<ThemeMode>("system");

  useEffect(() => {
    const data = localStorage.getItem("sb-ttibuajiyhfrsdyqsqsm-auth-token");
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

  // Efeito que controla a classe "dark" conforme o estado do tema
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      if (theme === "system") {
        // Verifica se o sistema está em modo escuro
        if (mediaQuery.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      } else if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme();

    const handleChange = () => {
      if (theme === "system") {
        applyTheme();
      }
    };

    // Escuta mudanças do sistema se o modo estiver em "system"
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  // Alternar tema de forma cíclica: system -> light -> dark -> system ...
  const handleToggleTheme = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  const handleNewUser = async () => {
    if (!newUserEmail) return;

    try {
      // 1️⃣ Verifica se o usuário existe na tabela profiles
      const { data: recepientUser, error: userError } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", newUserEmail)
        .single();

      if (userError || !recepientUser) {
        console.error("User not found:", userError);
        alert("User not found!");
        return;
      }

      // 2️⃣ Cria um novo chat com o usuário encontrado
      const { data: newChat, error: chatError } = await supabase
        .from("chats")
        .insert([
          {
            user_id: user?.id, // Ajuste para o ID real do usuário logado
            recipient_id: recepientUser.id,
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

      // 3️⃣ Atualiza estado local
      setChats((prevChats) => [newChat, ...prevChats]);

      // 4️⃣ Fecha modal e limpa o input
      setIsAddUserDialogOpen(false);
      setNewUserEmail("");
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  // Escolhe o ícone conforme o tema
  const renderThemeIcon = () => {
    if (theme === "system") {
      return <Monitor className="h-5 w-5" />;
    }
    if (theme === "light") {
      return <Sun className="h-5 w-5" />;
    }
    return <Moon className="h-5 w-5" />;
  };

  return (
    /**
     * As classes de cor usam Tailwind com darkMode: 'class'.
     * "dark" será adicionada ou removida ao <html> via useEffect.
     */
    <div className="flex h-[100dvh] w-full overflow-hidden bg-white text-black dark:bg-zinc-900 dark:text-zinc-100">
      {/* Botão de alternância de tema no canto superior DIREITO */}
      <button
        onClick={handleToggleTheme}
        title={`Tema atual: ${theme}`}
        className="
          absolute top-2 right-2 z-10
          flex items-center justify-center
          h-9 w-9
          rounded-md border
          bg-white dark:bg-zinc-800
          border-zinc-200 dark:border-zinc-700
          hover:bg-zinc-100 dark:hover:bg-zinc-700
          transition-colors
        "
      >
        {renderThemeIcon()}
      </button>

      {/* Barra lateral de chats */}
      <ChatSidebar
        chats={chats}
        onSelectChat={setSelectedChatId}
        selectedChatId={selectedChatId}
        onAddUser={() => setIsAddUserDialogOpen(true)}
      />

      {/* Área principal do chat */}
      <div className="flex-1 overflow-hidden">
        {selectedChat ? (
          <ChatWindow
            chatId={selectedChat.id}
            recipientName={selectedChat.recipientName}
            recipientAvatar={selectedChat.recipientAvatar}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-zinc-500 dark:text-zinc-400">
              Selecione um chat para começar a conversar
            </p>
          </div>
        )}
      </div>

      {/* Modal para adicionar novo usuário */}
      <Dialog
        open={isAddUserDialogOpen}
        onOpenChange={setIsAddUserDialogOpen}
      >
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
