import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Wifi, Monitor, Utensils, Navigation } from "lucide-react";
import { LiveTrackingModal } from "./LiveTrackingModal";

interface BusCardProps {
  bus: {
    id: string;
    name: string;
    operator: string;
    departure: string;
    arrival: string;
    duration: string;
    price: number;
    seatsAvailable: number;
    totalSeats: number;
    amenities: string[];
    rating: number;
  };
  onSelect: (busId: string) => void;
  from?: string;
  to?: string;
}

export const BusCard = ({ bus, onSelect, from = "", to = "" }: BusCardProps) => {
  const [showTrackingModal, setShowTrackingModal] = useState(false);
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

  const seatPercentage = (bus.seatsAvailable / bus.totalSeats) * 100;
  const seatStatus = seatPercentage > 50 ? 'success' : seatPercentage > 20 ? 'warning' : 'destructive';

  return (
    <Card className="bus-card animate-scale-in">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Bus Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg text-foreground">{bus.name}</h3>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="text-sm font-medium">{bus.rating}</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-3">{bus.operator}</p>
            
            {/* Time Info */}
            <div className="flex items-center gap-6 mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-medium">{bus.departure}</span>
              </div>
              <div className="text-muted-foreground">→</div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="font-medium">{bus.arrival}</span>
              </div>
              <Badge variant="secondary" className="ml-auto">
                {bus.duration}
              </Badge>
            </div>

            {/* Amenities */}
            <div className="flex items-center gap-2 mb-3">
              {bus.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price and Booking */}
          <div className="flex flex-col items-end gap-3 md:min-w-[150px]">
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">₹{bus.price}</div>
              <div className="text-xs text-muted-foreground">per seat</div>
            </div>

            {/* Seat Availability */}
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <Badge variant={seatStatus === 'success' ? 'default' : seatStatus === 'warning' ? 'secondary' : 'destructive'}>
                {bus.seatsAvailable} seats left
              </Badge>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowTrackingModal(true)}
                className="flex items-center gap-1"
              >
                <Navigation className="h-3 w-3" />
                Track
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => onSelect(bus.id)}
              >
                Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      
      <LiveTrackingModal
        isOpen={showTrackingModal}
        onClose={() => setShowTrackingModal(false)}
        busId={bus.id}
        busName={bus.name}
        from={from || ""}
        to={to || ""}
      />
    </Card>
  );
};