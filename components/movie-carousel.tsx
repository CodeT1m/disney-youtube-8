"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, Play, Plus, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Movie {
  id: number
  title: string
  image: string
  year: number
  rating: number
  genre: string
  overview: string
}

interface MovieCarouselProps {
  title: string
  movies: Movie[]
}

export function MovieCarousel({ title, movies }: MovieCarouselProps) {
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320 * 3 // Width of 3 cards
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (movies.length === 0) return null

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <div className="relative group">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie) => (
            <Card
              key={movie.id}
              className="flex-shrink-0 w-72 bg-card border-border overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10"
              onMouseEnter={() => setHoveredMovie(movie.id)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              <div className="relative">
                <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="w-full h-40 object-cover" />
                {hoveredMovie === movie.id && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-2">
                    <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Info className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground truncate">{movie.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
                  <span>{movie.year}</span>
                  <span className="flex items-center">⭐ {movie.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{movie.overview}</p>
              </div>
            </Card>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
