"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Movie {
  id: number
  title: string
  image: string
  year: number
  rating: number
  genre: string
}

interface MovieCarouselProps {
  title: string
  movies: Movie[]
}

export function MovieCarousel({ title, movies }: MovieCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, movies.length - 5))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, movies.length - 5)) % Math.max(1, movies.length - 5))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="relative group">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out gap-2"
            style={{ transform: `translateX(-${currentIndex * 20}%)` }}
          >
            {movies.map((movie) => (
              <Card
                key={movie.id}
                className="flex-shrink-0 w-48 bg-gray-900 border-gray-800 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10"
                onMouseEnter={() => setHoveredMovie(movie.id)}
                onMouseLeave={() => setHoveredMovie(null)}
              >
                <div className="relative">
                  <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="w-full h-72 object-cover" />
                  {hoveredMovie === movie.id && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Button size="icon" className="bg-white/20 hover:bg-white/30">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2">{movie.title}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{movie.year}</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      <span>{movie.rating}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{movie.genre}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
