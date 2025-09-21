import { SearchForm } from "@/components/SearchForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, Clock, MapPin, Shield, Star } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Bus className="w-6 h-6" />,
      title: "Wide Network",
      description: "Access to 1000+ buses across major routes"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-time Tracking", 
      description: "Live location updates and accurate timings"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safe & Secure",
      description: "Verified operators and secure payment gateway"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Quality Service",
      description: "Rated buses with customer reviews"
    }
  ];

  const popularRoutes = [
    { from: "Delhi", to: "Mumbai", price: "₹1,200", duration: "18h" },
    { from: "Bangalore", to: "Chennai", price: "₹650", duration: "7h" },
    { from: "Delhi", to: "Jaipur", price: "₹450", duration: "5h" },
    { from: "Mumbai", to: "Pune", price: "₹350", duration: "4h" }
  ];

  const changeLanguage = (language: string) => {
    console.log(`Language changed to: ${language}`);
    // Language change logic would go here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Language Selector */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-2 flex justify-end">
          <select 
            onChange={(e) => changeLanguage(e.target.value)}
            className="text-sm bg-background border border-border rounded px-3 py-1 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            defaultValue="en"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="as">অসমীয়া (Assamese)</option>
            <option value="bn">বাংলা (Bengali)</option>
            <option value="brx">बर'/Bodo</option>
            <option value="doi">डोगरी (Dogri)</option>
            <option value="gu">ગુજરાતી (Gujarati)</option>
            <option value="kn">ಕನ್ನಡ (Kannada)</option>
            <option value="ks">کٲشُر (Kashmiri)</option>
            <option value="kok">कोंकणी (Konkani)</option>
            <option value="mai">मैथिली (Maithili)</option>
            <option value="ml">മലയാളം (Malayalam)</option>
            <option value="mr">मराठी (Marathi)</option>
            <option value="mni">ꯃꯩꯇꯩꯂꯣꯟ (Meitei)</option>
            <option value="ne">नेपाली (Nepali)</option>
            <option value="or">ଓଡ଼ିଆ (Odia)</option>
            <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
            <option value="sa">संस्कृतम् (Sanskrit)</option>
            <option value="sat">ᱥᱟᱱᱛᱟᱲᱤ (Santali)</option>
            <option value="sd">سنڌي (Sindhi)</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="te">తెలుగు (Telugu)</option>
            <option value="ur">اردو (Urdu)</option>
          </select>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">
              Find Your Perfect Bus Journey
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Book bus tickets across India with real-time tracking, live location updates, and verified operators.
            </p>
            <Badge variant="secondary" className="text-primary font-semibold px-4 py-2">
              <MapPin className="w-4 h-4 mr-2" />
              Live GPS Tracking Enabled
            </Badge>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <SearchForm />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the best in bus travel with our comprehensive booking platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="travel-card text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Routes</h2>
            <p className="text-muted-foreground">Most searched bus routes across India</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, index) => (
              <Card 
                key={index} 
                className="travel-card hover:cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-muted-foreground">From</div>
                    <Badge variant="outline">{route.duration}</Badge>
                  </div>
                  <div className="font-semibold text-lg mb-1">{route.from}</div>
                  <div className="text-muted-foreground mb-3">to {route.to}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-primary">{route.price}</div>
                    <Button variant="ghost" size="sm">
                      View Buses
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-muted/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Bus Booking Platform. Safe travels with real-time tracking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
