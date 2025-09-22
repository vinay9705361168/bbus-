import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BusCard } from "@/components/BusCard";
import { MapComponent } from "@/components/MapComponent";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Filter } from "lucide-react";

// Mock bus data - in a real app, this would come from an API
const mockBuses = [
  {
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
    rating: 4.5
  },
  {
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
    rating: 4.2
  },
  {
    id: "3",
    name: "City Connect",
    operator: "RedLine Services", 
    departure: "11:00 AM",
    arrival: "06:30 PM",
    duration: "7h 30m", 
    price: 750,
    seatsAvailable: 8,
    totalSeats: 50,
    amenities: ["WiFi"],
    rating: 4.0
  },
  {
    id: "4",
    name: "Highway King",
    operator: "FastTrack Travels",
    departure: "02:00 PM",
    arrival: "09:45 PM", 
    duration: "7h 45m",
    price: 1100,
    seatsAvailable: 31,
    totalSeats: 35,
    amenities: ["WiFi", "Entertainment", "Meals"],
    rating: 4.7
  }
];

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(false);
  
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';

  const handleBusSelect = (busId: string) => {
    navigate(`/bus/${busId}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
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
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">{from}</span>
              </div>
              <div className="text-white/80">→</div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">{to}</span>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              onClick={() => setShowMap(!showMap)}
              className="text-white hover:bg-white/20"
            >
              <MapPin className="w-4 h-4 mr-2" />
              {showMap ? 'Hide Map' : 'Show Map'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bus Results */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Available Buses ({mockBuses.length})
              </h2>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {mockBuses.map((bus, index) => (
                <div key={bus.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <BusCard 
                    bus={bus} 
                    onSelect={handleBusSelect}
                    from={from}
                    to={to}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Map Sidebar */}
          <div className="lg:col-span-1">
            {showMap && (
              <Card className="travel-card sticky top-4">
                <CardContent className="p-0">
                  <MapComponent 
                    from={from} 
                    to={to} 
                    className="h-[500px] w-full" 
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}