"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MovieCarousel } from "@/components/movie-carousel"
import { AIRecommendations } from "@/components/ai-recommendations"
import { SearchModal } from "@/components/search-modal"

const trendingMovies = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    image: "/placeholder.svg?height=400&width=300",
    year: 2022,
    rating: 8.1,
    genre: "Sci-Fi",
  },
  {
    id: 2,
    title: "Top Gun: Maverick",
    image: "/placeholder.svg?height=400&width=300",
    year: 2022,
    rating: 8.3,
    genre: "Action",
  },
  {
    id: 3,
    title: "Black Panther: Wakanda Forever",
    image: "/placeholder.svg?height=400&width=300",
    year: 2022,
    rating: 7.3,
    genre: "Action",
  },
  {
    id: 4,
    title: "The Batman",
    image: "/placeholder.svg?height=400&width=300",
    year: 2022,
    rating: 7.8,
    genre: "Action",
  },
  {
    id: 5,
    title: "Doctor Strange: Multiverse of Madness",
    image: "/placeholder.svg?height=400&width=300",
    year: 2022,
    rating: 7.0,
    genre: "Fantasy",
  },
  {
    id: 6,
    title: "Minions: The Rise of Gru",
    image: "/placeholder.svg?height=400&width=300",
    year: 2022,
    rating: 6.5,
    genre: "Animation",
  },
]

const actionMovies = [
  {
    id: 7,
    title: "John Wick: Chapter 4",
    image: "/placeholder.svg?height=400&width=300",
    year: 2023,
    rating: 8.2,
    genre: "Action",
  },
  {
    id: 8,
    title: "Fast X",
    image: "/placeholder.svg?height=400&width=300",
    year: 2023,
    rating: 6.8,
    genre: "Action",
  },
  {
    id: 9,
    title: "Mission: Impossible 7",
    image: "/placeholder.svg?height=400&width=300",
    year: 2023,
    rating: 8.0,
    genre: "Action",
  },
  {
    id: 10,
    title: "Extraction 2",
    image: "/placeholder.svg?height=400&width=300",
    year: 2023,
    rating: 7.5,
    genre: "Action",
  },
  {
    id: 11,
    title: "The Gray Man",
    image: "/placeholder.svg?height=400&width=300",
    year: 2022,
    rating: 6.5,
    genre: "Action",
  },
  {
    id: 12,
    title: "Red Notice",
    image: "/placeholder.svg?height=400&width=300",
    year: 2021,
    rating: 6.3,
    genre: "Action",
  },
]

const comedyMovies = [
  {
    id: 13,
    title: "Glass Onion: A Knives Out Mystery",
    image: "/placeholder.svg?height=400&width=300",
    year: 2022,
    rating: 7.2,
    genre: "Comedy",
  },
  {
    id: 14,
    title: "Don't Look Up",
    image: "/placeholder.svg?height=400&width=300",
    year: 2021,
    rating: 7.2,
    genre: "Comedy",
  },
  {
    id: 15,
    title: "The Adam Project",
    image: "/placeholder.svg?height=400&width=300",
    year: 2022,
    rating: 6.7,
    genre: "Comedy",
  },
  {
    id: 16,
    title: "Enola Holmes 2",
    image: "/placeholder.svg?height=400&width=300",
    year: 2022,
    rating: 6.8,
    genre: "Comedy",
  },
  {
    id: 17,
    title: "The Kissing Booth 3",
    image: "/placeholder.svg?height=400&width=300",
    year: 2021,
    rating: 5.9,
    genre: "Comedy",
  },
  {
    id: 18,
    title: "Murder Mystery 2",
    image: "/placeholder.svg?height=400&width=300",
    year: 2023,
    rating: 5.7,
    genre: "Comedy",
  },
]

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <Header onSearchClick={() => setIsSearchOpen(true)} />
      <HeroSection />

      <div className="px-4 md:px-8 lg:px-16 space-y-8 pb-16">
        <MovieCarousel title="Trending Now" movies={trendingMovies} />
        <AIRecommendations />
        <MovieCarousel title="Action & Adventure" movies={actionMovies} />
        <MovieCarousel title="Comedy Movies" movies={comedyMovies} />
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  )
}
