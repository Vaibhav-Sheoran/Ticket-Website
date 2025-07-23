import { Star, Clock, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  rating: number;
  duration: string;
  genre: string;
  releaseDate: string;
  price: string;
  isNew?: boolean;
}

export const MovieCard = ({
  id,
  title,
  poster,
  rating,
  duration,
  genre,
  releaseDate,
  price,
  isNew = false,
}: MovieCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-cinema animate-fade-in">
      <div className="relative aspect-[2/3] overflow-hidden">
        {/* Movie Poster */}
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* New Badge */}
        {isNew && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground animate-glow">
            NEW
          </Badge>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="h-3 w-3 fill-cinema-gold text-cinema-gold" />
          <span className="text-xs font-medium text-white">{rating}</span>
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow"
            onClick={() => window.location.href = `/movie/${id}`}
          >
            Book Now
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          {/* Title */}
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {/* Genre */}
          <p className="text-sm text-muted-foreground">{genre}</p>
          
          {/* Movie Details */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{releaseDate}</span>
            </div>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-medium text-foreground">From {price}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto p-0 text-xs text-primary hover:text-primary-glow"
              onClick={() => window.location.href = `/movie/${id}`}
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};