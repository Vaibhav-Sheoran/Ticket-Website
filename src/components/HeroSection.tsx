import { Play, Star, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/cinema-hero.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Cinema Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
          {/* Badge */}
          <Badge 
            variant="secondary" 
            className="bg-accent/20 text-accent border-accent/30 backdrop-blur-sm animate-glow"
          >
            Now Playing
          </Badge>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Experience
              <span className="block bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
                Cinema Magic
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Book your favorite movies with the best seats at the best prices. 
              Enjoy premium comfort and cutting-edge technology.
            </p>
          </div>

          {/* Featured Movie Info */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-white/10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Featured Today</h3>
              <div className="flex items-center justify-between text-white/80 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-cinema-gold text-cinema-gold" />
                  <span>8.5</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>2h 28m</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow px-8 py-3 text-lg animate-float"
            >
              <Play className="h-5 w-5 mr-2" />
              Watch Trailer
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 text-lg"
            >
              Browse Movies
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-float"></div>
        </div>
      </div>
    </section>
  );
};