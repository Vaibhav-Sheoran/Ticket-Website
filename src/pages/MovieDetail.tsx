import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Clock, Calendar, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SeatSelection } from "@/components/SeatSelection";
import { sampleMovies } from "@/data/movies";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  
  const movie = sampleMovies.find(m => m.id === id);
  
  if (!movie) {
    navigate("/");
    return null;
  }

  const showtimes = ["10:00 AM", "1:30 PM", "4:45 PM", "8:00 PM", "10:30 PM"];
  const [selectedShowtime, setSelectedShowtime] = useState("");

  const handleBooking = () => {
    if (!selectedShowtime) {
      alert("Please select a showtime");
      return;
    }
    setShowSeatSelection(true);
  };

  if (showSeatSelection) {
    return (
      <SeatSelection 
        movie={movie} 
        showtime={selectedShowtime}
        onBack={() => setShowSeatSelection(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Movies
        </Button>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                {movie.isNew && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground animate-glow">
                    NEW
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Movie Info & Booking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Rating */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {movie.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-cinema-gold text-cinema-gold" />
                  <span className="font-medium">{movie.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{movie.releaseDate}</span>
                </div>
              </div>

              <Badge variant="secondary" className="text-sm">
                {movie.genre}
              </Badge>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Synopsis</h2>
              <p className="text-muted-foreground leading-relaxed">
                {movie.description}
              </p>
            </div>

            {/* Showtimes */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-semibold text-foreground">Select Showtime</h2>
                    <Badge variant="outline">Today</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {showtimes.map((time) => (
                      <Button
                        key={time}
                        variant={selectedShowtime === time ? "default" : "outline"}
                        className="p-3 h-auto"
                        onClick={() => setSelectedShowtime(time)}
                      >
                        <div className="text-center">
                          <div className="font-medium">{time}</div>
                          <div className="text-xs opacity-70">Available</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Book Button */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Starting from</div>
                    <div className="text-2xl font-bold text-foreground">{movie.price}</div>
                  </div>
                  
                  <Button 
                    size="lg"
                    onClick={handleBooking}
                    className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow px-8"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Select Seats
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <strong>Genre:</strong> {movie.genre}
              </div>
              <div>
                <strong>Rating:</strong> PG-13
              </div>
              <div>
                <strong>Language:</strong> English
              </div>
              <div>
                <strong>Screen:</strong> IMAX, Dolby Atmos
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;