"use client"

import { useState } from "react"
import { Sparkles, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MovieCarousel } from "@/components/movie-carousel"
import { generateRecommendations } from "@/lib/ai-recommendations"

export function AIRecommendations() {
  const [recommendations, setRecommendations] = useState([
    {
      id: 101,
      title: "Inception",
      image: "/placeholder.svg?height=400&width=300",
      year: 2010,
      rating: 8.8,
      genre: "Sci-Fi",
    },
    {
      id: 102,
      title: "Interstellar",
      image: "/placeholder.svg?height=400&width=300",
      year: 2014,
      rating: 8.6,
      genre: "Sci-Fi",
    },
    {
      id: 103,
      title: "The Matrix",
      image: "/placeholder.svg?height=400&width=300",
      year: 1999,
      rating: 8.7,
      genre: "Sci-Fi",
    },
    {
      id: 104,
      title: "Blade Runner 2049",
      image: "/placeholder.svg?height=400&width=300",
      year: 2017,
      rating: 8.0,
      genre: "Sci-Fi",
    },
    {
      id: 105,
      title: "Ex Machina",
      image: "/placeholder.svg?height=400&width=300",
      year: 2014,
      rating: 7.7,
      genre: "Sci-Fi",
    },
    {
      id: 106,
      title: "Arrival",
      image: "/placeholder.svg?height=400&width=300",
      year: 2016,
      rating: 7.9,
      genre: "Sci-Fi",
    },
  ])

  const [isGenerating, setIsGenerating] = useState(false)
  const [aiInsight, setAiInsight] = useState(
    "Based on your viewing history of sci-fi and action movies, here are some mind-bending films that explore themes of reality, consciousness, and the future.",
  )

  const handleGenerateNew = async () => {
    setIsGenerating(true)
    try {
      const newRecommendations = await generateRecommendations()
      setRecommendations(newRecommendations.movies)
      setAiInsight(newRecommendations.insight)
    } catch (error) {
      console.error("Failed to generate recommendations:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Sparkles className="h-5 w-5 text-purple-400" />
            AI Recommendations for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">{aiInsight}</p>
          <Button onClick={handleGenerateNew} disabled={isGenerating} className="bg-purple-600 hover:bg-purple-700">
            {isGenerating ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            {isGenerating ? "Generating..." : "Get New Recommendations"}
          </Button>
        </CardContent>
      </Card>

      <MovieCarousel title="Recommended for You" movies={recommendations} />
    </div>
  )
}
