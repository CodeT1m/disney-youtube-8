"use client"

import { Play, Plus, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  title: string
  description: string
  backgroundImage: string
  rating: number
  year: number
  genre: string
}

export function HeroSection({ title, description, backgroundImage, rating, year, genre }: HeroSectionProps) {
  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="relative h-full flex items-center px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl space-y-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">FEATURED</span>
            <span>{year}</span>
            <span>•</span>
            <span>{genre}</span>
            <span>•</span>
            <span className="flex items-center">⭐ {rating}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">{title}</h1>

          <p className="text-lg text-gray-200 leading-relaxed line-clamp-3">{description}</p>

          <div className="flex items-center space-x-4 pt-4">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200">
              <Play className="w-5 h-5 mr-2" />
              Play
            </Button>
            <Button size="lg" variant="secondary" className="bg-gray-600/80 text-white hover:bg-gray-600">
              <Info className="w-5 h-5 mr-2" />
              More Info
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/20">
              <Plus className="w-5 h-5 mr-2" />
              My List
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
