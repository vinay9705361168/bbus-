import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Ticket, ArrowLeft, MapPin, Clock, Users, CreditCard } from "lucide-react";

export default function GeneralTickets() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero text-white py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20" 
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Ticket className="w-8 h-8" />
              General Tickets
            </h1>
          </div>
          <Button variant="ghost" className="text-white hover:bg-white/20" onClick={() => navigate("/tickets")}>
            Back to Tickets
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* One-way Ticket */}
            <Card className="travel-card animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  One-way Ticket
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-6">Book a one-way ticket for your journey.</p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="from">From</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select departure point" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="downtown">Downtown Station</SelectItem>
                          <SelectItem value="university">University Station</SelectItem>
                          <SelectItem value="airport">Airport Station</SelectItem>
                          <SelectItem value="suburbs">Suburbs Station</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="to">To</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="downtown">Downtown Station</SelectItem>
                          <SelectItem value="university">University Station</SelectItem>
                          <SelectItem value="airport">Airport Station</SelectItem>
                          <SelectItem value="suburbs">Suburbs Station</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Travel Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  
                  <div>
                    <Label htmlFor="time">Preferred Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (6:00 AM - 12:00 PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12:00 PM - 6:00 PM)</SelectItem>
                        <SelectItem value="evening">Evening (6:00 PM - 12:00 AM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="passengers">Number of Passengers</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select passengers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Passenger</SelectItem>
                        <SelectItem value="2">2 Passengers</SelectItem>
                        <SelectItem value="3">3 Passengers</SelectItem>
                        <SelectItem value="4">4 Passengers</SelectItem>
                        <SelectItem value="5">5+ Passengers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Fare Estimate</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Base Fare:</span>
                        <span>₹25.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Distance:</span>
                        <span>8.5 km</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>₹25.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full" variant="travel">
                    Book One-way Ticket
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Return Ticket */}
            <Card className="travel-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  Return Ticket
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-6">Book a return ticket for your round trip.</p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fromReturn">From</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select departure point" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="downtown">Downtown Station</SelectItem>
                          <SelectItem value="university">University Station</SelectItem>
                          <SelectItem value="airport">Airport Station</SelectItem>
                          <SelectItem value="suburbs">Suburbs Station</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="toReturn">To</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="downtown">Downtown Station</SelectItem>
                          <SelectItem value="university">University Station</SelectItem>
                          <SelectItem value="airport">Airport Station</SelectItem>
                          <SelectItem value="suburbs">Suburbs Station</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="departureDate">Departure Date</Label>
                      <Input id="departureDate" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="returnDate">Return Date</Label>
                      <Input id="returnDate" type="date" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="passengersReturn">Number of Passengers</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select passengers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Passenger</SelectItem>
                        <SelectItem value="2">2 Passengers</SelectItem>
                        <SelectItem value="3">3 Passengers</SelectItem>
                        <SelectItem value="4">4 Passengers</SelectItem>
                        <SelectItem value="5">5+ Passengers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Fare Estimate</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>One-way Fare:</span>
                        <span>₹25.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Return Fare:</span>
                        <span>₹25.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Discount (10%):</span>
                        <span className="text-green-600">-₹5.00</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>₹45.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full" variant="travel">
                    Book Return Ticket
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Features Section */}
          <div className="mt-12">
            <Card className="travel-card">
              <CardHeader>
                <CardTitle>Why Choose Our Ticket Booking?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Secure Payment</h3>
                    <p className="text-sm text-muted-foreground">Safe and secure payment processing</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Real-time Updates</h3>
                    <p className="text-sm text-muted-foreground">Get live updates on your journey</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Easy Booking</h3>
                    <p className="text-sm text-muted-foreground">Simple and quick booking process</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

