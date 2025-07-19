"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const searchResults = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    image: "/placeholder.svg?height=150&width=100",
    year: 2022,
    type: "Movie",
  },
  {
    id: 2,
    title: "The Batman",
    image: "/placeholder.svg?height=150&width=100",
    year: 2022,
    type: "Movie",
  },
  {
    id: 3,
    title: "Stranger Things",
    image: "/placeholder.svg?height=150&width=100",
    year: 2022,
    type: "TV Series",
  },
  {
    id: 4,
    title: "Wednesday",
    image: "/placeholder.svg?height=150&width=100",
    year: 2022,
    type: "TV Series",
  },
]

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState(searchResults)

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchResults.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
      setResults(filtered)
    } else {
      setResults(searchResults)
    }
  }, [query])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border-gray-800 max-w-2xl max-h-[80vh] overflow-hidden p-0">
        <div className="flex items-center border-b border-gray-800 p-4">
          <Search className="h-5 w-5 text-gray-400 mr-3" />
          <Input
            placeholder="Search movies, TV shows..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 bg-transparent text-white placeholder-gray-400 focus-visible:ring-0"
            autoFocus
          />
          <button onClick={onClose} className="ml-3 text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-96">
          {results.length > 0 ? (
            <div className="space-y-3">
              {results.map((item) => (
                <Card
                  key={item.id}
                  className="bg-gray-900 border-gray-800 p-3 cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-white font-medium">{item.title}</h3>
                      <p className="text-gray-400 text-sm">
                        {item.year} • {item.type}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">No results found for "{query}"</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
