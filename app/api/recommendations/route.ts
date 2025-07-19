import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { getTrendingMovies, getPopularMovies, getImageUrl } from "@/lib/tmdb"

export async function POST(request: NextRequest) {
  try {
    const { preferences } = await request.json()

    // Get some real movies from TMDB
    const [trending, popular] = await Promise.all([getTrendingMovies(), getPopularMovies()])

    const allMovies = [...trending, ...popular]
    const movieTitles = allMovies
      .slice(0, 20)
      .map((movie) => movie.title)
      .join(", ")

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Based on user preferences: "${preferences}", recommend 6 movies from this list: ${movieTitles}. 
      
      Respond with a JSON object containing:
      1. "movies": array of exactly 6 movie titles from the provided list
      2. "explanation": a brief explanation (2-3 sentences) of why these movies were chosen based on the preferences
      
      Make sure to only recommend movies that exist in the provided list.`,
    })

    // Parse AI response
    let aiResponse
    try {
      aiResponse = JSON.parse(text)
    } catch {
      // Fallback if AI doesn't return valid JSON
      aiResponse = {
        movies: trending.slice(0, 6).map((m) => m.title),
        explanation: "Here are some trending movies that match your preferences for high-quality entertainment.",
      }
    }

    // Match AI recommendations with actual movie data
    const recommendedMovies = aiResponse.movies
      .map((title: string) => {
        const movie = allMovies.find(
          (m) =>
            m.title.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(m.title.toLowerCase()),
        )
        if (movie) {
          return {
            id: movie.id,
            title: movie.title,
            image: getImageUrl(movie.poster_path),
            year: new Date(movie.release_date).getFullYear() || 2024,
            rating: Math.round(movie.vote_average * 10) / 10,
            genre: "Recommended",
            overview: movie.overview,
          }
        }
        return null
      })
      .filter(Boolean)
      .slice(0, 6)

    // If we don't have enough matches, fill with trending movies
    while (recommendedMovies.length < 6 && recommendedMovies.length < trending.length) {
      const movie = trending[recommendedMovies.length]
      if (!recommendedMovies.find((rm) => rm?.id === movie.id)) {
        recommendedMovies.push({
          id: movie.id,
          title: movie.title,
          image: getImageUrl(movie.poster_path),
          year: new Date(movie.release_date).getFullYear() || 2024,
          rating: Math.round(movie.vote_average * 10) / 10,
          genre: "Recommended",
          overview: movie.overview,
        })
      }
    }

    return NextResponse.json({
      movies: recommendedMovies,
      explanation:
        aiResponse.explanation || "These movies are recommended based on current trends and your preferences.",
    })
  } catch (error) {
    console.error("Error generating recommendations:", error)

    // Fallback recommendations
    try {
      const trending = await getTrendingMovies()
      const fallbackMovies = trending.slice(0, 6).map((movie) => ({
        id: movie.id,
        title: movie.title,
        image: getImageUrl(movie.poster_path),
        year: new Date(movie.release_date).getFullYear() || 2024,
        rating: Math.round(movie.vote_average * 10) / 10,
        genre: "Trending",
        overview: movie.overview,
      }))

      return NextResponse.json({
        movies: fallbackMovies,
        explanation: "Here are some trending movies you might enjoy!",
      })
    } catch {
      return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
    }
  }
}
