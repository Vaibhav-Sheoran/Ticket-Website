import { useState } from "react";
import { ArrowLeft, CreditCard, Check, Ticket } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import type { Movie } from "@/data/movies";

interface PaymentModalProps {
  movie: Movie;
  showtime: string;
  selectedSeats: Array<{
    id: string;
    row: string;
    number: number;
    price: number;
  }>;
  totalPrice: number;
  onBack: () => void;
}

export const PaymentModal = ({ movie, showtime, selectedSeats, totalPrice, onBack }: PaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [bookingId] = useState(`BK${Date.now()}`);

  const convenienceFee = 2.99;
  const taxes = totalPrice * 0.1; // 10% tax
  const finalTotal = totalPrice + convenienceFee + taxes;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate Razorpay payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setPaymentSuccess(true);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 pt-24 pb-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-green-200 bg-green-50/50 dark:bg-green-900/20 dark:border-green-800">
              <CardContent className="p-8 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">
                    Booking Confirmed!
                  </h2>
                  <p className="text-green-700 dark:text-green-300">
                    Your tickets have been successfully booked
                  </p>
                </div>

                <Card className="bg-white dark:bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-center space-x-2">
                      <Ticket className="h-5 w-5" />
                      <span>Booking Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Booking ID:</span>
                        <span className="font-mono">{bookingId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Movie:</span>
                        <span>{movie.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Show Time:</span>
                        <span>{showtime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Seats:</span>
                        <span>{selectedSeats.map(s => s.id).join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Total Paid:</span>
                        <span className="font-bold">${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <Button 
                    className="w-full bg-primary hover:bg-primary-glow"
                    onClick={() => window.location.href = '/'}
                  >
                    Back to Home
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.print()}
                  >
                    Download Ticket
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
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
          disabled={isProcessing}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Seat Selection
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Payment Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Razorpay Simulation */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">R</span>
                  </div>
                  <span className="font-semibold text-blue-800 dark:text-blue-200">Razorpay Payment Gateway</span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  This is a demo payment interface. In production, this would integrate with actual Razorpay.
                </p>
              </div>

              {/* Mock Payment Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    defaultValue="4111 1111 1111 1111"
                    disabled={isProcessing}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      defaultValue="12/26"
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      defaultValue="123"
                      disabled={isProcessing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    defaultValue="John Doe"
                    disabled={isProcessing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    defaultValue="john@example.com"
                    disabled={isProcessing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Movie Details */}
              <div className="space-y-2">
                <h3 className="font-medium">{movie.title}</h3>
                <div className="text-sm text-muted-foreground">
                  <div>{showtime}</div>
                  <div>{movie.genre}</div>
                </div>
              </div>

              <Separator />

              {/* Seat Details */}
              <div className="space-y-2">
                <h4 className="font-medium">Selected Seats</h4>
                <div className="space-y-1">
                  {selectedSeats.map((seat) => (
                    <div key={seat.id} className="flex justify-between text-sm">
                      <span>
                        {seat.id} 
                        {seat.price > 13 && (
                          <Badge variant="secondary" className="ml-1 text-xs">VIP</Badge>
                        )}
                      </span>
                      <span>${seat.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tickets ({selectedSeats.length})</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Convenience Fee</span>
                  <span>${convenienceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxes</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Button */}
              <Button 
                className="w-full bg-primary hover:bg-primary-glow text-primary-foreground"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay ${finalTotal.toFixed(2)}
                  </>
                )}
              </Button>

              {isProcessing && (
                <div className="text-center text-sm text-muted-foreground">
                  Please do not refresh or close this page
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};