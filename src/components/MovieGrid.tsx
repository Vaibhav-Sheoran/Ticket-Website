import { useState, useMemo } from "react";
import { MovieCard } from "./MovieCard";
import { MovieFilters } from "./MovieFilters";
import { sampleMovies, Movie } from "@/data/movies";

export const MovieGrid = () => {
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [selectedSort, setSelectedSort] = useState("popular");

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    let movies = [...sampleMovies];

    // Filter by genre
    if (selectedGenre !== "All Genres") {
      movies = movies.filter(movie => 
        movie.genre.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    // Sort movies
    movies.sort((a, b) => {
      switch (selectedSort) {
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.isNew ? 1 : -1;
        case "price-low":
          return parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", ""));
        case "price-high":
          return parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", ""));
        default: // popular
          return b.rating - a.rating; // Use rating as popularity metric
      }
    });

    return movies;
  }, [selectedGenre, selectedSort]);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <MovieFilters
                selectedGenre={selectedGenre}
                selectedSort={selectedSort}
                onGenreChange={setSelectedGenre}
                onSortChange={setSelectedSort}
                totalMovies={filteredMovies.length}
              />
            </div>
          </div>

          {/* Movies Grid */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Section Header */}
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Now Showing
                </h2>
                <p className="text-muted-foreground">
                  Discover the latest movies playing in theaters near you
                </p>
              </div>

              {/* Movies Grid */}
              {filteredMovies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMovies.map((movie, index) => (
                    <div 
                      key={movie.id} 
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <MovieCard {...movie} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="space-y-4">
                    <div className="text-4xl">🎬</div>
                    <h3 className="text-xl font-semibold text-foreground">
                      No movies found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters to see more movies
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};