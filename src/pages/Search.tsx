import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BusCard } from "@/components/BusCard";
import { MapComponent } from "@/components/MapComponent";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Filter, Clock } from "lucide-react";

// Mock bus data - in a real app, this would come from an API
const mockBuses = [
  {
    id: "1",
    name: "PRTC BUS",
    operator: "Ordinary Bus",
    price: 95,
    departure: "04:30 AM",
    arrival: "~06:30–07:00 AM",
    duration: "02h.15m",
    totalSeats: 52
  },
  {
    id: "2",
    name: "PRTC BUS",
    operator: "Ordinary Bus",
    price: 95,
    departure: "06:31 AM",
    arrival: "~08:30–09:00 AM",
    duration: "02h.15m",
    totalSeats: 52
  },
  {
    id: "3",
    name: "PRTC BUS",
    operator: "Ordinary Bus",
    price: 95,
    departure: "07:52 AM",
    arrival: "~09:50–10:20 AM",
    duration: "02h.20m",
    totalSeats: 52
  },
  {
    id: "4",
    name: "PRTC BUS",
    operator: "Ordinary Bus",
    price: 95,
    departure: "09:31 AM",
    arrival: "~11:30–12:00 PM",
    duration: "02h.00m",
    totalSeats: 52
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

  // Helpers for the timing summary strip
  const to24Hour = (time12h: string) => {
    const match = time12h.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return time12h;
    let hour = parseInt(match[1], 10);
    const minutes = match[2];
    const meridiem = match[3].toUpperCase();
    if (meridiem === 'PM' && hour !== 12) hour += 12;
    if (meridiem === 'AM' && hour === 12) hour = 0;
    const hh = hour.toString().padStart(2, '0');
    return `${hh}:${minutes}`;
  };

  const formatDurationDot = (duration: string) => {
    const match = duration.trim().match(/^(\d+)h\s*(\d+)m$/i);
    if (!match) return duration;
    const hh = match[1].padStart(2, '0');
    const mm = match[2].padStart(2, '0');
    return `${hh}h.${mm}m`;
  };

  // Fixed summary data as requested example
  const summary = {
    dep24: '04:30',
    origin: from || 'Ludhiana',
    dur: '02h.15m',
    arr24: '06:30–07:00',
    dest: to || 'Amritsar'
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
            <div className="flex-1">
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

              {/* Timing summary strip */}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 opacity-90" />
                  <span className="font-semibold">{summary.dep24}</span>
                </div>
                <span className="rounded-full bg-white/15 px-2 py-0.5">
                  {summary.dur}
                </span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 opacity-90" />
                  <span className="font-semibold">{summary.arr24}</span>
                </div>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              onClick={() => {
                const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&travelmode=transit`;
                window.open(url, '_blank');
              }}
              className="text-white hover:bg-white/20"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Open in Google Maps
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