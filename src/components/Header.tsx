import { useState } from "react";
import { Film, Search, Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CinemaBook
              </span>
            </a>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search movies..."
                className="w-full pl-10 bg-card/50 border-border/50 focus:bg-card"
              />
            </div>
          </div>

          {/* Desktop Navigation & Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-8">
              <a href="/" className="text-foreground hover:text-primary transition-colors">Movies</a>
              <a href="/theaters" className="text-foreground hover:text-primary transition-colors">Theaters</a>
              <a href="/events" className="text-foreground hover:text-primary transition-colors">Events</a>
              <a href="/offers" className="text-foreground hover:text-primary transition-colors">Offers</a>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-foreground hover:text-primary"
                onClick={() => window.location.href = '/login'}
              >
                Sign In
              </Button>
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary-glow text-primary-foreground"
                onClick={() => window.location.href = '/signup'}
              >
                Sign Up
              </Button>
              
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="text-foreground hover:text-primary"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search movies..."
                  className="w-full pl-10 bg-card/50"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2">
                <a href="/" className="px-2 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Movies
                </a>
                <a href="/theaters" className="px-2 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Theaters
                </a>
                <a href="/events" className="px-2 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Events
                </a>
                <a href="/offers" className="px-2 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Offers
                </a>
              </nav>

              {/* Mobile Actions */}
              <div className="flex flex-col space-y-2 pt-2 border-t border-border/40">
                <Button 
                  variant="ghost" 
                  className="justify-start text-foreground hover:text-primary"
                  onClick={() => window.location.href = '/login'}
                >
                  Sign In
                </Button>
                <Button 
                  className="justify-start bg-primary hover:bg-primary-glow text-primary-foreground"
                  onClick={() => window.location.href = '/signup'}
                >
                  Sign Up
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-foreground hover:text-primary"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  {theme === "light" ? "Dark Mode" : "Light Mode"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};