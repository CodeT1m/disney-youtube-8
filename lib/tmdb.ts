const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

// Using the Bearer token from your TMDB account
const TMDB_BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDRmYTgyY2ZiYzM3ZTM3YTMyMTI1Y2E5OTRkNjlhOSIsIm5iZiI6MTc1Mjg5ODE3MS41MTQsInN1YiI6IjY4N2IxYTdiMjIzMTAyYmMzZTU1YzUyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ctatgibFfXkTrkbAG-UBn9WadvWmrtFJfIVtvC3wIZ4"

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
  adult: boolean
  popularity: number
}

export interface Genre {
  id: number
  name: string
}

export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export function getImageUrl(path: string | null, size = "w500"): string {
  if (!path) return "/placeholder.svg?height=400&width=300"
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
  const url = `${TMDB_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      accept: "application/json",
    },
    next: { revalidate: 86400 }, // 24 hours
  })

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`)
  }

  return response.json()
}

export async function getTrendingMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<TMDBResponse<Movie>>("/trending/movie/week")
  return data.results
}

export async function getPopularMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<TMDBResponse<Movie>>("/movie/popular")
  return data.results
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<TMDBResponse<Movie>>("/movie/top_rated")
  return data.results
}

export async function getUpcomingMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<TMDBResponse<Movie>>("/movie/upcoming")
  return data.results
}

export async function getMoviesByGenre(genreId: number, page = 1): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>(
    `/discover/movie?with_genres=${genreId}&page=${page}&sort_by=popularity.desc`,
  )
}

export async function getGenres(): Promise<Genre[]> {
  const data = await fetchFromTMDB<{ genres: Genre[] }>("/genre/movie/list?language=en")
  return data.genres
}

export async function searchMovies(query: string, page = 1): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`)
}

export async function getActionMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<TMDBResponse<Movie>>("/discover/movie?with_genres=28&sort_by=popularity.desc")
  return data.results
}

export async function getComedyMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<TMDBResponse<Movie>>("/discover/movie?with_genres=35&sort_by=popularity.desc")
  return data.results
}

export async function getHorrorMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<TMDBResponse<Movie>>("/discover/movie?with_genres=27&sort_by=popularity.desc")
  return data.results
}

export async function getRomanceMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB<TMDBResponse<Movie>>("/discover/movie?with_genres=10749&sort_by=popularity.desc")
  return data.results
}
