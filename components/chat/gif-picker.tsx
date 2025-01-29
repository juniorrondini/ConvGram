"use client"

import { useState } from "react"
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

  const searchGifs = async () => {
    const API_KEY = "AIzaSyANA6vLvUqZE3VV85BFuZTsnE3XaePlg0w"
    const response = await fetch(
      `https://tenor.googleapis.com/v2/search?q=${searchTerm}&key=${API_KEY}&client_key=my_test_app&limit=20`,
    )
    const data = await response.json()
    setGifs(data.results)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
        <div className="mb-4 flex items-center">
          <Input
            type="text"
            placeholder="Search GIFs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={searchGifs} className="ml-2">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-64">
          <div className="grid grid-cols-2 gap-2">
            {gifs.map((gif) => (
              <img
                key={gif.id}
                src={gif.media_formats.tinygif.url || "/placeholder.svg"}
                alt={gif.content_description}
                className="cursor-pointer rounded"
                onClick={() => onSelectGif(gif.media_formats.gif.url)}
              />
            ))}
          </div>
        </ScrollArea>
        <Button onClick={onClose} className="mt-4 w-full">
          Close
        </Button>
      </div>
    </div>
  )
}

