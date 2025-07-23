export interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: number;
  duration: string;
  genre: string;
  releaseDate: string;
  price: string;
  isNew?: boolean;
  description: string;
}

export const sampleMovies: Movie[] = [
  {
    id: "1",
    title: "Quantum Paradox",
    poster: "https://images.unsplash.com/photo-1489599735734-79b4abb67043?w=400&h=600&fit=crop",
    rating: 8.7,
    duration: "2h 15m",
    genre: "Sci-Fi Thriller",
    releaseDate: "2024",
    price: "$12.99",
    isNew: true,
    description: "A mind-bending journey through time and space that challenges reality itself."
  },
  {
    id: "2", 
    title: "Ocean's Horizon",
    poster: "https://images.unsplash.com/photo-1586811987985-7ad9b947709c?w=400&h=600&fit=crop",
    rating: 7.9,
    duration: "1h 58m",
    genre: "Adventure Drama",
    releaseDate: "2024",
    price: "$11.99",
    description: "An epic tale of survival and discovery on the high seas."
  },
  {
    id: "3",
    title: "Neon Nights",
    poster: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?w=400&h=600&fit=crop",
    rating: 8.2,
    duration: "2h 5m", 
    genre: "Cyberpunk Action",
    releaseDate: "2024",
    price: "$13.99",
    isNew: true,
    description: "In a dystopian future, one hacker holds the key to humanity's freedom."
  },
  {
    id: "4",
    title: "The Last Symphony",
    poster: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=600&fit=crop",
    rating: 9.1,
    duration: "2h 45m",
    genre: "Musical Drama",
    releaseDate: "2024",
    price: "$14.99",
    description: "A master composer's final masterpiece becomes a race against time."
  },
  {
    id: "5",
    title: "Desert Storm",
    poster: "https://images.unsplash.com/photo-1551872742-f5e3bfea6e86?w=400&h=600&fit=crop",
    rating: 7.6,
    duration: "1h 42m",
    genre: "Action Adventure",
    releaseDate: "2024",
    price: "$10.99",
    description: "A thrilling chase across the unforgiving desert landscape."
  },
  {
    id: "6",
    title: "Starlight Academy",
    poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    rating: 8.4,
    duration: "2h 20m",
    genre: "Fantasy Adventure",
    releaseDate: "2024",
    price: "$12.99",
    description: "Young wizards must master their powers to save their magical school."
  },
  {
    id: "7",
    title: "Midnight Express",
    poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963f?w=400&h=600&fit=crop",
    rating: 7.8,
    duration: "1h 55m",
    genre: "Crime Thriller",
    releaseDate: "2024",
    price: "$11.99",
    description: "A high-stakes heist on a cross-country train journey."
  },
  {
    id: "8",
    title: "Cosmic Dreams",
    poster: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop",
    rating: 8.9,
    duration: "2h 38m",
    genre: "Space Opera",
    releaseDate: "2024",
    price: "$15.99",
    isNew: true,
    description: "An interstellar epic spanning galaxies and generations."
  }
];

export const movieGenres = [
  "All Genres",
  "Action",
  "Adventure", 
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller"
];

export const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" }
];