"use client"

import { Play, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex items-center h-full px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">The Quantum Realm</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Journey into the microscopic universe where the laws of physics bend and reality becomes fluid. A
            mind-bending adventure that will challenge everything you thought you knew about existence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-semibold">
              <Play className="mr-2 h-5 w-5" />
              Play
            </Button>
            <Button size="lg" variant="secondary" className="bg-gray-600/70 text-white hover:bg-gray-600">
              <Info className="mr-2 h-5 w-5" />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
