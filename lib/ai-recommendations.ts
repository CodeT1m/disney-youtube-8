import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface Movie {
  id: number
  title: string
  image: string
  year: number
  rating: number
  genre: string
}

interface RecommendationResult {
  movies: Movie[]
  insight: string
}

export async function generateRecommendations(): Promise<RecommendationResult> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system:
        'You are a movie recommendation AI. Generate 6 diverse movie recommendations with titles, years (2010-2023), ratings (6.0-9.0), and genres. Also provide a brief insight about why these movies were recommended. Return the response in JSON format with "movies" array and "insight" string.',
      prompt:
        "Generate 6 movie recommendations for someone who enjoys sci-fi, action, and thriller movies. Include a mix of popular and hidden gems.",
    })

    // Parse the AI response
    const aiResponse = JSON.parse(text)

    // Transform the AI response into our movie format
    const movies: Movie[] = aiResponse.movies.map((movie: any, index: number) => ({
      id: 200 + index,
      title: movie.title,
      image: `/placeholder.svg?height=400&width=300&query=${encodeURIComponent(movie.title + " movie poster")}`,
      year: movie.year,
      rating: movie.rating,
      genre: movie.genre,
    }))

    return {
      movies,
      insight: aiResponse.insight,
    }
  } catch (error) {
    console.error("Error generating recommendations:", error)

    // Fallback recommendations
    return {
      movies: [
        {
          id: 201,
          title: "Dune",
          image: "/placeholder.svg?height=400&width=300",
          year: 2021,
          rating: 8.0,
          genre: "Sci-Fi",
        },
        {
          id: 202,
          title: "Mad Max: Fury Road",
          image: "/placeholder.svg?height=400&width=300",
          year: 2015,
          rating: 8.1,
          genre: "Action",
        },
        {
          id: 203,
          title: "Parasite",
          image: "/placeholder.svg?height=400&width=300",
          year: 2019,
          rating: 8.5,
          genre: "Thriller",
        },
        {
          id: 204,
          title: "Everything Everywhere All at Once",
          image: "/placeholder.svg?height=400&width=300",
          year: 2022,
          rating: 7.8,
          genre: "Sci-Fi",
        },
        {
          id: 205,
          title: "The Menu",
          image: "/placeholder.svg?height=400&width=300",
          year: 2022,
          rating: 7.2,
          genre: "Thriller",
        },
        {
          id: 206,
          title: "Nope",
          image: "/placeholder.svg?height=400&width=300",
          year: 2022,
          rating: 6.8,
          genre: "Sci-Fi",
        },
      ],
      insight:
        "These recommendations blend cutting-edge sci-fi concepts with intense action and psychological thrills, perfect for viewers who appreciate both spectacle and substance.",
    }
  }
}
