"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { searchMovies, getImageUrl, type Movie } from "@/lib/tmdb"
import { useDebounce } from "@/hooks/use-debounce"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

interface SearchResult {
  id: number
  title: string
  image: string
  year: number
  type: string
  overview: string
  rating: number
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 500)

  const searchForMovies = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const data = await searchMovies(searchQuery)
      const transformedResults: SearchResult[] = data.results.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        image: getImageUrl(movie.poster_path, "w154"),
        year: new Date(movie.release_date).getFullYear() || 0,
        type: "Movie",
        overview: movie.overview,
        rating: Math.round(movie.vote_average * 10) / 10,
      }))
      setResults(transformedResults.slice(0, 10)) // Limit to 10 results
    } catch (error) {
      console.error("Error searching movies:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    searchForMovies(debouncedQuery)
  }, [debouncedQuery, searchForMovies])

  const handleClose = () => {
    setQuery("")
    setResults([])
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-background border-border max-w-2xl max-h-[80vh] overflow-hidden p-0">
        <div className="flex items-center border-b border-border p-4">
          <Search className="h-5 w-5 text-muted-foreground mr-3" />
          <Input
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 bg-transparent text-foreground placeholder-muted-foreground focus-visible:ring-0"
            autoFocus
          />
          <button onClick={handleClose} className="ml-3 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-96">
          {loading ? (
            <div className="text-center text-muted-foreground py-8">Searching...</div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              {results.map((item) => (
                <Card
                  key={item.id}
                  className="bg-card border-border p-3 cursor-pointer hover:bg-accent transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-12 h-16 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-foreground font-medium truncate">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {item.year} • {item.type} • ⭐ {item.rating}
                      </p>
                      {item.overview && (
                        <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{item.overview}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : query.trim() && !loading ? (
            <div className="text-center text-muted-foreground py-8">No results found for "{query}"</div>
          ) : (
            <div className="text-center text-muted-foreground py-8">Start typing to search for movies...</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
