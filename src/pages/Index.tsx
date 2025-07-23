import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MovieGrid } from "@/components/MovieGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MovieGrid />
      </main>
    </div>
  );
};

export default Index;
