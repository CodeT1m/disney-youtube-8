"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { SearchModal } from "@/components/search-modal"
import { MovieCarousel } from "@/components/movie-carousel"
import { getGenres, getMoviesByGenre, getImageUrl, type Genre, type Movie } from "@/lib/tmdb"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MovieWithImage extends Omit<Movie, "poster_path"> {
  image: string
  year: number
  rating: number
  genre: string
}

export default function GenresPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null)
  const [movies, setMovies] = useState<MovieWithImage[]>([])
  const [loading, setLoading] = useState(true)
  const [moviesLoading, setMoviesLoading] = useState(false)

  useEffect(() => {
    async function fetchGenres() {
      try {
        const genreData = await getGenres()
        setGenres(genreData)
        if (genreData.length > 0) {
          setSelectedGenre(genreData[0])
        }
      } catch (error) {
        console.error("Error fetching genres:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGenres()
  }, [])

  useEffect(() => {
    async function fetchMoviesByGenre() {
      if (!selectedGenre) return

      setMoviesLoading(true)
      try {
        const movieData = await getMoviesByGenre(selectedGenre.id)

        const transformedMovies: MovieWithImage[] = movieData.results.map((movie: Movie) => ({
          ...movie,
          image: getImageUrl(movie.poster_path),
          year: new Date(movie.release_date).getFullYear() || 2024,
          rating: Math.round(movie.vote_average * 10) / 10,
          genre: selectedGenre.name,
        }))

        setMovies(transformedMovies)
      } catch (error) {
        console.error("Error fetching movies by genre:", error)
      } finally {
        setMoviesLoading(false)
      }
    }

    fetchMoviesByGenre()
  }, [selectedGenre])

  const handleGenreChange = (genreId: string) => {
    const genre = genres.find((g) => g.id.toString() === genreId)
    if (genre) {
      setSelectedGenre(genre)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header onSearchClick={() => setIsSearchOpen(true)} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading genres...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onSearchClick={() => setIsSearchOpen(true)} />

      <div className="pt-20 px-4 md:px-8 lg:px-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6">Browse by Genre</h1>

          <div className="max-w-xs">
            <Select value={selectedGenre?.id.toString()} onValueChange={handleGenreChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id.toString()}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {moviesLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-xl">Loading {selectedGenre?.name} movies...</div>
          </div>
        ) : (
          selectedGenre && <MovieCarousel title={`${selectedGenre.name} Movies`} movies={movies.slice(0, 18)} />
        )}
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  )
}
