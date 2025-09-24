import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight, Search, Volume2, VolumeX } from "lucide-react";

interface SearchFormProps {
  onSearch?: (from: string, to: string) => void;
  i18n?: {
    heading?: string;
    subheading?: string;
    fromLabel?: string;
    toLabel?: string;
    fromPlaceholder?: string;
    toPlaceholder?: string;
    swap?: string;
    searchBtn?: string;
  };
}

export const SearchForm = ({ onSearch, i18n }: SearchFormProps) => {
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
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

  const speakText = (text: string) => {
    if (!text.trim()) return;
    
    // Stop any current speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    
    setIsSpeaking(true);
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8; // Slightly slower for better understanding
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-US'; // Set language for better pronunciation
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Cleanup effect to stop speech when component unmounts
  useEffect(() => {
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <Card className="travel-card animate-slide-up">
      <CardContent className="p-8">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">{i18n?.heading ?? 'Find Your Bus'}</h2>
            <p className="text-muted-foreground">{i18n?.subheading ?? 'Search for buses between stations'}</p>
            {isSpeaking && (
              <div className="mt-2 flex items-center justify-center gap-2 text-sm text-primary">
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span>Speaking station name...</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* From Station */}
            <div className="space-y-2">
              <Label htmlFor="from" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {i18n?.fromLabel ?? 'From Station'}
              </Label>
              <div className="relative">
                <Input
                  id="from"
                  type="text"
                  placeholder={i18n?.fromPlaceholder ?? 'Enter departure station'}
                  value={fromStation}
                  onChange={(e) => setFromStation(e.target.value)}
                  className="search-input pr-12"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => isSpeaking ? stopSpeaking() : speakText(fromStation)}
                  disabled={!fromStation.trim()}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-primary/10"
                  title={isSpeaking ? "Stop speaking" : "Listen to station name"}
                  aria-label={isSpeaking ? "Stop speaking station name" : "Listen to station name"}
                >
                  {isSpeaking ? (
                    <VolumeX className="w-4 h-4 text-red-500" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-primary" />
                  )}
                </Button>
              </div>
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
                {i18n?.toLabel ?? 'To Station'}
              </Label>
              <div className="relative">
                <Input
                  id="to"
                  type="text"
                  placeholder={i18n?.toPlaceholder ?? 'Enter destination station'}
                  value={toStation}
                  onChange={(e) => setToStation(e.target.value)}
                  className="search-input pr-12"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => isSpeaking ? stopSpeaking() : speakText(toStation)}
                  disabled={!toStation.trim()}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-primary/10"
                  title={isSpeaking ? "Stop speaking" : "Listen to station name"}
                  aria-label={isSpeaking ? "Stop speaking station name" : "Listen to station name"}
                >
                  {isSpeaking ? (
                    <VolumeX className="w-4 h-4 text-red-500" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-primary" />
                  )}
                </Button>
              </div>
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
              {i18n?.swap ?? 'Swap Stations'}
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
            {i18n?.searchBtn ?? 'Search Buses'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};