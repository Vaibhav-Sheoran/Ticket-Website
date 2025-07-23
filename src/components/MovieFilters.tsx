import { useState } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { movieGenres, sortOptions } from "@/data/movies";

interface MovieFiltersProps {
  onGenreChange: (genre: string) => void;
  onSortChange: (sort: string) => void;
  selectedGenre: string;
  selectedSort: string;
  totalMovies: number;
}

export const MovieFilters = ({
  onGenreChange,
  onSortChange,
  selectedGenre,
  selectedSort,
  totalMovies
}: MovieFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Filters</h3>
          <Badge variant="secondary" className="text-xs">
            {totalMovies} movies
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Filters */}
      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden md:block'} animate-fade-in`}>
        {/* Sort Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Sort by</label>
          <Select value={selectedSort} onValueChange={onSortChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Genre Pills */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Genre</label>
          <div className="flex flex-wrap gap-2">
            {movieGenres.map((genre) => {
              const isSelected = selectedGenre === genre;
              return (
                <Button
                  key={genre}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => onGenreChange(genre)}
                  className={`h-8 text-xs transition-all duration-200 ${
                    isSelected 
                      ? "bg-primary text-primary-foreground shadow-glow" 
                      : "hover:bg-muted hover:scale-105"
                  }`}
                >
                  {genre}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Active Filters */}
        {(selectedGenre !== "All Genres" || selectedSort !== "popular") && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Active Filters</label>
            <div className="flex flex-wrap gap-2">
              {selectedGenre !== "All Genres" && (
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  onClick={() => onGenreChange("All Genres")}
                >
                  {selectedGenre} ×
                </Badge>
              )}
              {selectedSort !== "popular" && (
                <Badge 
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  onClick={() => onSortChange("popular")}
                >
                  {sortOptions.find(opt => opt.value === selectedSort)?.label} ×
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};