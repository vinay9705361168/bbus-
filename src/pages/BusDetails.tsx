import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapComponent } from "@/components/MapComponent";
import { ArrowLeft, Bus } from "lucide-react";
import RouteTimeline from "@/components/RouteTimeline";

// Mock detailed bus data - in a real app, this would come from an API
const mockBusDetails = {
  "1": {
    id: "1",
    name: "PRTC Bus 1",
    operator: "PRTC Bus No. 1",
    route: [
      { lat: 31.326, lng: 75.5762, name: "Jalandhar" },
      { lat: 31.6333, lng: 75.72, name: "Hoshiarpur" },
      { lat: 31.3818, lng: 75.386, name: "Phagwara" },
      { lat: 31.2242, lng: 75.7673, name: "Kapurthala" },
      { lat: 30.7333, lng: 76.7794, name: "Chandigarh" },
      { lat: 30.9, lng: 76.85, name: "Mohali" },
      { lat: 30.9, lng: 75.8573, name: "Fatehgarh Sahib" },
      { lat: 30.901, lng: 75.857, name: "Ludhiana" }
    ]
  },
  "2": {
    id: "2",
    name: "PRTC Bus 2",
    operator: "PRTC Bus No. 2",
    route: [
      { lat: 31.326, lng: 75.5762, name: "Jalandhar" },
      { lat: 31.6333, lng: 75.72, name: "Hoshiarpur" },
      { lat: 31.3818, lng: 75.386, name: "Phagwara" },
      { lat: 31.2242, lng: 75.7673, name: "Kapurthala" },
      { lat: 30.7333, lng: 76.7794, name: "Chandigarh" },
      { lat: 30.9, lng: 76.85, name: "Mohali" },
      { lat: 30.9, lng: 75.8573, name: "Fatehgarh Sahib" },
      { lat: 30.901, lng: 75.857, name: "Ludhiana" }
    ]
  },
  "3": {
    id: "3",
    name: "PRTC Bus 3",
    operator: "PRTC Bus No. 3",
    route: [
      { lat: 31.326, lng: 75.5762, name: "Jalandhar" },
      { lat: 31.6333, lng: 75.72, name: "Hoshiarpur" },
      { lat: 31.3818, lng: 75.386, name: "Phagwara" },
      { lat: 31.2242, lng: 75.7673, name: "Kapurthala" },
      { lat: 30.7333, lng: 76.7794, name: "Chandigarh" },
      { lat: 30.9, lng: 76.85, name: "Mohali" },
      { lat: 30.9, lng: 75.8573, name: "Fatehgarh Sahib" },
      { lat: 30.901, lng: 75.857, name: "Ludhiana" }
    ]
  },
  "4": {
    id: "4",
    name: "PRTC Bus 4",
    operator: "PRTC Bus No. 4",
    route: [
      { lat: 31.326, lng: 75.5762, name: "Jalandhar" },
      { lat: 31.6333, lng: 75.72, name: "Hoshiarpur" },
      { lat: 31.3818, lng: 75.386, name: "Phagwara" },
      { lat: 31.2242, lng: 75.7673, name: "Kapurthala" },
      { lat: 30.7333, lng: 76.7794, name: "Chandigarh" },
      { lat: 30.9, lng: 76.85, name: "Mohali" },
      { lat: 30.9, lng: 75.8573, name: "Fatehgarh Sahib" },
      { lat: 30.901, lng: 75.857, name: "Ludhiana" }
    ]
  }
};


export default function BusDetails() {
  const { busId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showFullRoute, setShowFullRoute] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  
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
            
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Route Details */}
          <Card className="travel-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Bus className="w-5 h-5 mr-2 text-primary" />
                    Route Details
                  </span>
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
                {/* Map Modal Trigger */}
                <div className="mb-4">
                  <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
                    <DialogTrigger asChild>
                      <Button variant="travel" size="sm">
                        View Route Map
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center">
                          <Bus className="w-5 h-5 mr-2 text-primary" /> Route Map
                        </DialogTitle>
                      </DialogHeader>
                      <div className="h-[60vh] w-full rounded-lg overflow-hidden">
                        <MapComponent 
                          route={bus.route}
                          className="h-full w-full"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                {showFullRoute && (
                  <div className="space-y-4">
                    <RouteTimeline
                      stops={bus.route.map((r) => ({ name: r.name }))}
                      seedTime={'05:00 AM'}
                      minutesBetweenStops={18}
                      dwellMinutes={2}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}