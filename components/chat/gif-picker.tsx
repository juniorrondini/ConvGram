"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface GifPickerProps {
  onSelectGif: (gifUrl: string) => void
  onClose: () => void
}

export function GifPicker({ onSelectGif, onClose }: GifPickerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [gifs, setGifs] = useState<any[]>([])

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        searchGifs();
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const searchGifs = async () => {
    try {
      const API_KEY = "AIzaSyANA6vLvUqZE3VV85BFuZTsnE3XaePlg0w"
      const response = await fetch(
        `https://tenor.googleapis.com/v2/search?q=${searchTerm}&key=${API_KEY}&client_key=my_test_app&limit=20`,
      )
      const data = await response.json()
      setGifs(data.results)
    } catch (error) {
      console.error("Erro ao buscar GIFs:", error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Pesquisar GIFs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <ScrollArea className="h-[400px] rounded-md border">
          <div className="grid grid-cols-2 gap-2 p-2">
            {gifs.map((gif) => (
              <div key={gif.id} className="relative aspect-video overflow-hidden rounded-md">
                <img
                  src={gif.media_formats.tinygif.url || "/placeholder.svg"}
                  alt={gif.content_description}
                  className="h-full w-full cursor-pointer object-cover transition-transform hover:scale-105"
                  onClick={() => onSelectGif(gif.media_formats.gif.url)}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
        <Button 
          onClick={onClose} 
          variant="secondary" 
          className="mt-4 w-full"
        >
          Fechar
        </Button>
      </div>
    </div>
  )
}

