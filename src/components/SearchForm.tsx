import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight, Search } from "lucide-react";

interface SearchFormProps {
  onSearch?: (from: string, to: string) => void;
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromStation.trim() && toStation.trim()) {
      if (onSearch) {
        onSearch(fromStation.trim(), toStation.trim());
      } else {
        navigate(`/search?from=${encodeURIComponent(fromStation.trim())}&to=${encodeURIComponent(toStation.trim())}`);
      }
    }
  };

  const swapStations = () => {
    setFromStation(toStation);
    setToStation(fromStation);
  };

  return (
    <Card className="travel-card animate-slide-up">
      <CardContent className="p-8">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Find Your Bus</h2>
            <p className="text-muted-foreground">Search for buses between stations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* From Station */}
            <div className="space-y-2">
              <Label htmlFor="from" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                From Station
              </Label>
              <Input
                id="from"
                type="text"
                placeholder="Enter departure station"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                className="search-input"
                required
              />
            </div>

            {/* Swap Button */}
            <div className="absolute left-1/2 top-8 transform -translate-x-1/2 z-10 hidden md:block">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={swapStations}
                className="rounded-full bg-background border-2 border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* To Station */}
            <div className="space-y-2">
              <Label htmlFor="to" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                To Station
              </Label>
              <Input
                id="to"
                type="text"
                placeholder="Enter destination station"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                className="search-input"
                required
              />
            </div>
          </div>

          {/* Mobile Swap Button */}
          <div className="flex justify-center md:hidden">
            <Button
              type="button"
              variant="ghost"
              onClick={swapStations}
              className="text-primary hover:bg-primary/10"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-90" />
              Swap Stations
            </Button>
          </div>

          <Button 
            type="submit" 
            variant="travel" 
            size="xl" 
            className="w-full"
            disabled={!fromStation.trim() || !toStation.trim()}
          >
            <Search className="w-5 h-5 mr-2" />
            Search Buses
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};