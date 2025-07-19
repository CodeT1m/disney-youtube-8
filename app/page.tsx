"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MovieCarousel } from "@/components/movie-carousel"
import { SearchModal } from "@/components/search-modal"
import { AIRecommendations } from "@/components/ai-recommendations"
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
  getRomanceMovies,
  getImageUrl,
  type Movie,
} from "@/lib/tmdb"

interface MovieWithImage extends Omit<Movie, "poster_path"> {
  image: string
  year: number
  rating: number
  genre: string
}

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [featuredMovie, setFeaturedMovie] = useState<MovieWithImage | null>(null)
  const [trendingMovies, setTrendingMovies] = useState<MovieWithImage[]>([])
  const [popularMovies, setPopularMovies] = useState<MovieWithImage[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<MovieWithImage[]>([])
  const [actionMovies, setActionMovies] = useState<MovieWithImage[]>([])
  const [comedyMovies, setComedyMovies] = useState<MovieWithImage[]>([])
  const [horrorMovies, setHorrorMovies] = useState<MovieWithImage[]>([])
  const [romanceMovies, setRomanceMovies] = useState<MovieWithImage[]>([])
  const [loading, setLoading] = useState(true)

  const transformMovies = (movies: Movie[], genre: string): MovieWithImage[] => {
    return movies.map((movie) => ({
      ...movie,
      image: getImageUrl(movie.poster_path),
      year: new Date(movie.release_date).getFullYear() || 2024,
      rating: Math.round(movie.vote_average * 10) / 10,
      genre,
    }))
  }

  useEffect(() => {
    async function fetchAllMovies() {
      try {
        const [trending, popular, topRated, action, comedy, horror, romance] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
          getActionMovies(),
          getComedyMovies(),
          getHorrorMovies(),
          getRomanceMovies(),
        ])

        const transformedTrending = transformMovies(trending, "Trending")
        const transformedPopular = transformMovies(popular, "Popular")
        const transformedTopRated = transformMovies(topRated, "Top Rated")
        const transformedAction = transformMovies(action, "Action")
        const transformedComedy = transformMovies(comedy, "Comedy")
        const transformedHorror = transformMovies(horror, "Horror")
        const transformedRomance = transformMovies(romance, "Romance")

        setTrendingMovies(transformedTrending)
        setPopularMovies(transformedPopular)
        setTopRatedMovies(transformedTopRated)
        setActionMovies(transformedAction)
        setComedyMovies(transformedComedy)
        setHorrorMovies(transformedHorror)
        setRomanceMovies(transformedRomance)

        // Set featured movie from trending
        if (transformedTrending.length > 0) {
          setFeaturedMovie(transformedTrending[0])
        }
      } catch (error) {
        console.error("Error fetching movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllMovies()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header onSearchClick={() => setIsSearchOpen(true)} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading movies...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onSearchClick={() => setIsSearchOpen(true)} />

      {featuredMovie && (
        <HeroSection
          title={featuredMovie.title}
          description={featuredMovie.overview}
          backgroundImage={getImageUrl(featuredMovie.backdrop_path, "original")}
          rating={featuredMovie.rating}
          year={featuredMovie.year}
          genre={featuredMovie.genre}
        />
      )}

      <div className="px-4 md:px-8 lg:px-16 space-y-8 pb-16">
        {trendingMovies.length > 0 && <MovieCarousel title="Trending Now" movies={trendingMovies.slice(0, 18)} />}

        {popularMovies.length > 0 && <MovieCarousel title="Popular Movies" movies={popularMovies.slice(0, 18)} />}

        <AIRecommendations />

        {actionMovies.length > 0 && <MovieCarousel title="Action Movies" movies={actionMovies.slice(0, 18)} />}

        {comedyMovies.length > 0 && <MovieCarousel title="Comedy Movies" movies={comedyMovies.slice(0, 18)} />}

        {topRatedMovies.length > 0 && <MovieCarousel title="Top Rated" movies={topRatedMovies.slice(0, 18)} />}

        {horrorMovies.length > 0 && <MovieCarousel title="Horror Movies" movies={horrorMovies.slice(0, 18)} />}

        {romanceMovies.length > 0 && <MovieCarousel title="Romance Movies" movies={romanceMovies.slice(0, 18)} />}
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  )
}
