import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Tickets() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero text-white py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Ticket Booking</h1>
          <Button variant="ghost" className="text-white hover:bg-white/20" onClick={() => navigate("/")}>Home</Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ticket Booking Options</h2>
          <p className="text-muted-foreground mb-8">Choose your booking type to get started</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card className="travel-card animate-slide-up cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/student-pass")}>
              <CardHeader>
                <CardTitle>Student Pass</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Apply for or renew student bus passes</p>
              </CardContent>
            </Card>

            <Card className="travel-card animate-slide-up cursor-pointer hover:shadow-lg transition-shadow" style={{ animationDelay: '0.1s' }} onClick={() => navigate("/general-tickets")}>
              <CardHeader>
                <CardTitle>General Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Book tickets for daily commuting</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}


