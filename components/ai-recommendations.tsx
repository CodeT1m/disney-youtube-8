"use client"

import { useState, useEffect } from "react"
import { MovieCarousel } from "@/components/movie-carousel"
import { Button } from "@/components/ui/button"
import { Sparkles, RefreshCw } from "lucide-react"

interface Movie {
  id: number
  title: string
  image: string
  year: number
  rating: number
  genre: string
  overview: string
}

interface AIRecommendation {
  movies: Movie[]
  explanation: string
}

export function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<AIRecommendation | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

  const fetchRecommendations = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          preferences: "action, sci-fi, thriller movies with high ratings",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setRecommendations(data)
        setHasLoaded(true)
      }
    } catch (error) {
      console.error("Error fetching AI recommendations:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!hasLoaded) {
      fetchRecommendations()
    }
  }, [hasLoaded])

  if (!recommendations && !loading && !hasLoaded) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-purple-500" />
          <h2 className="text-2xl font-bold text-foreground">AI Recommendations</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchRecommendations}
          disabled={loading}
          className="flex items-center space-x-2 bg-transparent"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </Button>
      </div>

      {recommendations?.explanation && (
        <p className="text-muted-foreground text-sm bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
          <span className="font-medium text-purple-400">AI Insight:</span> {recommendations.explanation}
        </p>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span>Generating personalized recommendations...</span>
          </div>
        </div>
      ) : recommendations?.movies ? (
        <MovieCarousel title="" movies={recommendations.movies} />
      ) : null}
    </div>
  )
}
