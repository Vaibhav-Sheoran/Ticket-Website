import { useState } from "react";
import { ArrowLeft, Users, CreditCard } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PaymentModal } from "@/components/PaymentModal";
import type { Movie } from "@/data/movies";

interface SeatSelectionProps {
  movie: Movie;
  showtime: string;
  onBack: () => void;
}

type SeatStatus = 'available' | 'selected' | 'taken';

interface Seat {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
  price: number;
}

export const SeatSelection = ({ movie, showtime, onBack }: SeatSelectionProps) => {
  const [showPayment, setShowPayment] = useState(false);
  
  // Generate seat data
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 12;
    
    rows.forEach((row, rowIndex) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const isAisle = i === 3 || i === 10;
        const isTaken = Math.random() < 0.3; // 30% chance of being taken
        const isVip = rowIndex >= 5; // Last 3 rows are VIP
        
        seats.push({
          id: `${row}${i}`,
          row,
          number: i,
          status: isTaken ? 'taken' : 'available',
          price: isVip ? 15.99 : 12.99,
        });
      }
    });
    
    return seats;
  };

  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  
  const selectedSeats = seats.filter(seat => seat.status === 'selected');
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handleSeatClick = (seatId: string) => {
    setSeats(seats.map(seat => {
      if (seat.id === seatId && seat.status !== 'taken') {
        return {
          ...seat,
          status: seat.status === 'selected' ? 'available' : 'selected'
        };
      }
      return seat;
    }));
  };

  const getSeatColor = (status: SeatStatus) => {
    switch (status) {
      case 'available':
        return 'bg-seat-available hover:bg-seat-available/80 border-seat-available';
      case 'selected':
        return 'bg-seat-selected border-seat-selected shadow-glow';
      case 'taken':
        return 'bg-seat-taken border-seat-taken cursor-not-allowed';
      default:
        return 'bg-muted';
    }
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }
    setShowPayment(true);
  };

  if (showPayment) {
    return (
      <PaymentModal
        movie={movie}
        showtime={showtime}
        selectedSeats={selectedSeats}
        totalPrice={totalPrice}
        onBack={() => setShowPayment(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Movie Details
        </Button>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Seat Map */}
          <div className="xl:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Select Your Seats</CardTitle>
                <div className="text-center text-sm text-muted-foreground">
                  {movie.title} • {showtime}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Screen */}
                <div className="mb-8">
                  <div className="w-full h-3 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mb-2"></div>
                  <div className="text-center text-sm text-muted-foreground">SCREEN</div>
                </div>

                {/* Seat Map */}
                <div className="space-y-2 max-w-4xl mx-auto">
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((row) => (
                    <div key={row} className="flex items-center justify-center space-x-1">
                      {/* Row Label */}
                      <div className="w-6 text-center text-sm font-medium text-muted-foreground">
                        {row}
                      </div>
                      
                      {/* Seats */}
                      <div className="flex space-x-1">
                        {seats
                          .filter(seat => seat.row === row)
                          .map((seat, index) => (
                            <div key={seat.id} className="flex items-center">
                              <button
                                onClick={() => handleSeatClick(seat.id)}
                                disabled={seat.status === 'taken'}
                                className={`
                                  w-6 h-6 rounded-t-lg border-2 transition-all duration-200
                                  ${getSeatColor(seat.status)}
                                  ${seat.status !== 'taken' ? 'hover:scale-110' : ''}
                                `}
                                title={`${seat.id} - $${seat.price}`}
                              >
                                <span className="sr-only">{seat.id}</span>
                              </button>
                              {/* Aisle spacing */}
                              {(index === 2 || index === 9) && <div className="w-4" />}
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex justify-center space-x-6 mt-8 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-seat-available border border-seat-available rounded-t"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-seat-selected border border-seat-selected rounded-t"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-seat-taken border border-seat-taken rounded-t"></div>
                    <span>Occupied</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="xl:col-span-1">
            <div className="sticky top-32">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Booking Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Movie Info */}
                  <div className="space-y-2">
                    <h3 className="font-medium">{movie.title}</h3>
                    <div className="text-sm text-muted-foreground">
                      <div>{showtime}</div>
                      <div>{movie.genre}</div>
                    </div>
                  </div>

                  <Separator />

                  {/* Selected Seats */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Selected Seats</h4>
                    {selectedSeats.length > 0 ? (
                      <div className="space-y-1">
                        {selectedSeats.map((seat) => (
                          <div key={seat.id} className="flex justify-between text-sm">
                            <span>{seat.id} {seat.price > 13 ? <Badge variant="secondary" className="ml-1 text-xs">VIP</Badge> : null}</span>
                            <span>${seat.price}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        No seats selected
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="space-y-2">
                    <div className="flex justify-between font-medium">
                      <span>Total ({selectedSeats.length} seats)</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      + Convenience fees will be calculated at checkout
                    </div>
                  </div>

                  {/* Proceed Button */}
                  <Button 
                    className="w-full bg-primary hover:bg-primary-glow text-primary-foreground"
                    onClick={handleProceedToPayment}
                    disabled={selectedSeats.length === 0}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Payment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};