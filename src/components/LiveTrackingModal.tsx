import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapComponent } from "./MapComponent";
import { MapPin, Clock, Navigation } from "lucide-react";

interface LiveTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  busId: string;
  busName: string;
  from: string;
  to: string;
}

export const LiveTrackingModal = ({ isOpen, onClose, busId, busName, from, to }: LiveTrackingModalProps) => {
  const [isTracking, setIsTracking] = useState(false);

  // Mock bus location - in real app, this would come from Supabase real-time data
  const mockBusLocation = {
    lat: 28.6139,
    lng: 77.2090,
    speed: 65,
    nextStop: "Highway Plaza",
    estimatedArrival: "2h 30m"
  };

  const handleStartTracking = () => {
    setIsTracking(true);
    // In real implementation, this would subscribe to real-time bus location from Supabase
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            Live Tracking - {busName}
          </DialogTitle>
          <div className="text-sm text-muted-foreground">
            Route: {from} → {to}
          </div>
        </DialogHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 mb-4">
            {isTracking ? (
              <MapComponent 
                from={from} 
                to={to} 
                className="h-full rounded-lg"
              />
            ) : (
              <div className="h-full bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Start Live Tracking</h3>
                  <p className="text-muted-foreground mb-4">
                    Get real-time location updates for {busName}
                  </p>
                  <Button onClick={handleStartTracking}>
                    Start Tracking
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {isTracking && (
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Current Speed</div>
                <div className="text-lg font-semibold">{mockBusLocation.speed} km/h</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Next Stop</div>
                <div className="text-lg font-semibold">{mockBusLocation.nextStop}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3" />
                  ETA
                </div>
                <div className="text-lg font-semibold">{mockBusLocation.estimatedArrival}</div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};