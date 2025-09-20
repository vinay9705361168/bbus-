import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapComponent } from "@/components/MapComponent";
import { ArrowLeft, Clock, MapPin, Users, Wifi, Monitor, Utensils, Star, Phone, Mail } from "lucide-react";

// Mock detailed bus data - in a real app, this would come from an API
const mockBusDetails = {
  "1": {
    id: "1",
    name: "Express Traveler",
    operator: "BlueLine Transport",
    departure: "06:00 AM",
    arrival: "02:00 PM", 
    duration: "8h 0m",
    price: 850,
    seatsAvailable: 23,
    totalSeats: 45,
    amenities: ["WiFi", "Entertainment", "Meals"],
    rating: 4.5,
    reviews: 142,
    description: "Comfortable express service with modern amenities. Non-stop journey with professional drivers.",
    contact: {
      phone: "+91-98765-43210",
      email: "support@blueline.com"
    },
    route: [
      { lat: 28.6139, lng: 77.2090, name: "Delhi Central Bus Terminal" },
      { lat: 28.4595, lng: 77.0266, name: "Gurgaon Bus Stand" },
      { lat: 27.8974, lng: 78.0880, name: "Aligarh Junction" },
      { lat: 26.8467, lng: 80.9462, name: "Lucknow Charbagh" }
    ]
  },
  "2": {
    id: "2",
    name: "Royal Cruiser", 
    operator: "GreenLine Express",
    departure: "08:30 AM",
    arrival: "04:15 PM",
    duration: "7h 45m",
    price: 950,
    seatsAvailable: 12,
    totalSeats: 40,
    amenities: ["WiFi", "Entertainment"],
    rating: 4.2,
    reviews: 89,
    description: "Premium bus service with luxury seating and onboard entertainment system.",
    contact: {
      phone: "+91-87654-32109", 
      email: "info@greenline.com"
    },
    route: [
      { lat: 28.6139, lng: 77.2090, name: "Delhi ISBT" },
      { lat: 28.4089, lng: 77.3178, name: "Noida Sector 18" },
      { lat: 27.1767, lng: 78.0081, name: "Agra Cantt" },
      { lat: 26.8467, lng: 80.9462, name: "Lucknow Alambagh" }
    ]
  }
};

export default function BusDetails() {
  const { busId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showFullRoute, setShowFullRoute] = useState(false);
  
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  
  const bus = mockBusDetails[busId as keyof typeof mockBusDetails];
  
  if (!bus) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Bus Not Found</h1>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'entertainment':
        return <Monitor className="w-4 h-4" />;
      case 'meals':
        return <Utensils className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(`/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Results
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{bus.name}</h1>
              <p className="text-white/90">{bus.operator}</p>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold">₹{bus.price}</div>
              <div className="text-white/80">per seat</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bus Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <Card className="travel-card animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Bus Overview
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-bold">{bus.rating}</span>
                    <span className="text-muted-foreground text-sm">({bus.reviews} reviews)</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{bus.description}</p>
                
                {/* Time and Route */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="font-semibold">{bus.departure}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{from}</p>
                  </div>
                  
                  <div className="text-center">
                    <Badge variant="secondary" className="mb-2">
                      {bus.duration}
                    </Badge>
                    <p className="text-sm text-muted-foreground">Duration</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-secondary" />
                      <span className="font-semibold">{bus.arrival}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{to}</p>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="font-semibold mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-3">
                    {bus.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 rounded-lg">
                        {getAmenityIcon(amenity)}
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seat Availability */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">Seat Availability</span>
                  </div>
                  <Badge variant={bus.seatsAvailable > 20 ? "default" : bus.seatsAvailable > 10 ? "secondary" : "destructive"}>
                    {bus.seatsAvailable} of {bus.totalSeats} available
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="travel-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">{bus.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">{bus.contact.email}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Route Details */}
            <Card className="travel-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Route Details
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowFullRoute(!showFullRoute)}
                  >
                    {showFullRoute ? 'Hide' : 'Show'} Full Route
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showFullRoute && (
                  <div className="space-y-3">
                    {bus.route.map((stop, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-primary' : index === bus.route.length - 1 ? 'bg-secondary' : 'bg-muted-foreground'}`} />
                        <span className="text-sm">{stop.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Map and Booking */}
          <div className="lg:col-span-1 space-y-6">
            {/* Route Map */}
            <Card className="travel-card sticky top-4">
              <CardHeader>
                <CardTitle>Route Map</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <MapComponent 
                  route={bus.route}
                  className="h-[400px] w-full rounded-b-lg" 
                />
              </CardContent>
            </Card>

            {/* Booking Card */}
            <Card className="travel-card">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-primary">₹{bus.price}</div>
                    <div className="text-muted-foreground">per seat</div>
                  </div>
                  
                  <Button variant="travel" size="lg" className="w-full">
                    Book Now
                  </Button>
                  
                  <p className="text-xs text-muted-foreground">
                    Free cancellation up to 2 hours before departure
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}