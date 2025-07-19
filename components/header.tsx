"use client"

import { Search, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

interface HeaderProps {
  onSearchClick: () => void
}

export function Header({ onSearchClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-4">
        <div className="flex items-center space-x-8">
          <div className="text-red-600 text-2xl font-bold">CineAI</div>
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-foreground hover:text-muted-foreground transition-colors">
              Home
            </a>
            <a href="/genres" className="text-muted-foreground hover:text-foreground transition-colors">
              Genres
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Movies
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              TV Shows
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              My List
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onSearchClick} className="text-foreground hover:bg-accent">
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
