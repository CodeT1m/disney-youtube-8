import { NextResponse } from "next/server"
import { generateRecommendations } from "@/lib/ai-recommendations"

export async function POST() {
  try {
    const recommendations = await generateRecommendations()
    return NextResponse.json(recommendations)
  } catch (error) {
    console.error("Error in recommendations API:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
