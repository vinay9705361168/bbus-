import { useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, Clock, MapPin, Shield, Star } from "lucide-react";

// Translation dictionary
const translations = {
  en: {
    title: "Where is My Bus?",
    desc: "Track your bus in real-time.",
    startBtn: "Start Tracking"
  },
  hi: {
    title: "मेरी बस कहाँ है?",
    desc: "अपनी बस को वास्तविक समय में ट्रैक करें।",
    startBtn: "ट्रैकिंग शुरू करें"
  },
  as: {
    title: "মোৰ বাচ ক'ত?",
    desc: "আপোনাৰ বাচ বাস্তৱ সময়ত ট্ৰেক কৰক।",
    startBtn: "ট্ৰেকিং আৰম্ভ কৰক"
  },
  bn: {
    title: "আমার বাস কোথায়?",
    desc: "বাসটি রিয়েল-টাইমে ট্র্যাক করুন।",
    startBtn: "ট্র্যাকিং শুরু করুন"
  },
  brx: {
    title: "आंनि बस सिगां?",
    desc: "नोंथांनि बस रियल-टाइम ट्रेक खालाम।",
    startBtn: "ट्रेकिंग जागाय"
  },
  doi: {
    title: "मेरी बस कित्थे ऐ?",
    desc: "अपणी बस नूं असल समय च ट्रैक करो।",
    startBtn: "ट्रैकिंग शुरू करो"
  },
  gu: {
    title: "મારી બસ ક્યાં છે?",
    desc: "તમારી બસને વાસ્તવિક સમયમાં ટ્રેક કરો.",
    startBtn: "ટ્રેકિંગ શરૂ કરો"
  },
  kn: {
    title: "ನನ್ನ ಬಸ್ ಎಲ್ಲಿದೆ?",
    desc: "ನಿಮ್ಮ ಬಸ್ಸನ್ನು ನಿಜವಾದ ಸಮಯದಲ್ಲಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
    startBtn: "ಟ್ರ್ಯಾಕಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ"
  },
  ks: {
    title: "میری بس کتھ چھُ؟",
    desc: "اپنی بس حقیقی وقت چھ ٹریک كریو۔",
    startBtn: "ٹریکنگ شروع كریو"
  },
  kok: {
    title: "माझी बस कंय आसा?",
    desc: "तुमची बस वेळेवर ट्रॅक करात.",
    startBtn: "ट्रॅकिंग सुरू करात"
  },
  mai: {
    title: "हमर बस कतए अछि?",
    desc: "अपन बसकेँ वास्तविक समयमेँ ट्रैक करू।",
    startBtn: "ट्रैकिंग शुरू करू"
  },
  ml: {
    title: "എന്റെ ബസ് എവിടെയാണ്?",
    desc: "നിങ്ങളുടെ ബസ് യഥാർത്ഥ സമയത്ത് ട്രാക്ക് ചെയ്യുക.",
    startBtn: "ട്രാക്കിംഗ് ആരംഭിക്കുക"
  },
  mr: {
    title: "माझी बस कुठे आहे?",
    desc: "तुमची बस प्रत्यक्ष वेळेत ट्रॅक करा.",
    startBtn: "ट्रॅकिंग सुरू करा"
  },
  mni: {
    title: "ꯃꯃꯥꯡꯃꯥ ꯚꯔꯤꯁ ꯍꯧꯕꯥ?",
    desc: "ꯃꯍꯤ ꯚꯔꯤꯁ ꯑꯍꯧ ꯇꯧꯕ ꯂꯤꯌꯥꯛ ꯑꯃꯥ ꯃꯥꯡꯗ ꯇ꯭ꯔꯦꯛ ꯇꯧꯕꯥ.",
    startBtn: "ꯇ꯭ꯔꯦꯛ ꯇꯧꯕꯥ"
  },
  ne: {
    title: "मेरो बस कहाँ छ?",
    desc: "तपाईंको बस वास्तविक समयमा ट्र्याक गर्नुहोस्।",
    startBtn: "ट्र्याकिङ सुरु गर्नुहोस्"
  },
  or: {
    title: "ମୋର ବସ୍ କେଉଁଠି?",
    desc: "ଆପଣଙ୍କ ବସ୍ କୁ ସଜିବା ସମୟରେ ଟ୍ରାକ୍ କରନ୍ତୁ।",
    startBtn: "ଟ୍ରାକିଙ୍ଗ ଆରମ୍ଭ କରନ୍ତୁ"
  },
  pa: {
    title: "ਮੇਰੀ ਬੱਸ ਕਿੱਥੇ ਹੈ?",
    desc: "ਆਪਣੀ ਬੱਸ ਨੂੰ ਅਸਲ ਸਮੇਂ 'ਚ ਟ੍ਰੈਕ ਕਰੋ।",
    startBtn: "ਟ੍ਰੈਕਿੰਗ ਸ਼ੁਰੂ ਕਰੋ"
  },
  sa: {
    title: "मम बसः कुत्र?",
    desc: "स्वस्य बसं वास्तविककाले अनुगच्छतु।",
    startBtn: "अनुगमनं आरभत"
  },
  sat: {
    title: "ᱟᱢᱟᱨ ᱵᱟᱥ ᱠᱟᱱᱟᱹ?",
    desc: "ᱚᱱᱚᱠᱚ ᱵᱟᱥ ᱨᱤᱭᱟᱹᱞ ᱴᱟᱭᱢᱽ ᱡᱚᱜᱚᱲ ᱠᱚ.",
    startBtn: "ᱴᱟᱭᱢᱽ ᱡᱚᱜᱚ"
  },
  sd: {
    title: "منهنجي بس ڪٿي آهي؟",
    desc: "پنهنجي بس کي حقيقي وقت ۾ ٽريڪ ڪريو.",
    startBtn: "ٽريڪنگ شروع ڪريو"
  },
  ta: {
    title: "என் பஸ் எங்கே?",
    desc: "உங்கள் பஸ்ஸை நேரடியாக கண்காணிக்கவும்.",
    startBtn: "கண்காணிப்பை தொடங்கவும்"
  },
  te: {
    title: "నా బస్సు ఎక్కడ ఉంది?",
    desc: "మీ బస్సును నిజ సమయంలో ట్రాక్ చేయండి.",
    startBtn: "ట్రాకింగ్ ప్రారంభించండి"
  },
  ur: {
    title: "میری بس کہاں ہے؟",
    desc: "اپنی بس کو حقیقی وقت میں ٹریک کریں۔",
    startBtn: "ٹر یکنک شروع کریں"
  }
};

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const changeLanguage = (language: string) => {
    setCurrentLanguage(language);
    console.log(`Language changed to: ${language}`);
  };
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
            <h1 id="title" className="text-5xl font-bold mb-4">
              {translations[currentLanguage as keyof typeof translations].title}
            </h1>
            <p id="desc" className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {translations[currentLanguage as keyof typeof translations].desc}
            </p>
            <div className="mb-8">
              <button 
                id="startBtn"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors mr-4"
              >
                {translations[currentLanguage as keyof typeof translations].startBtn}
              </button>
              <Badge variant="secondary" className="text-primary font-semibold px-4 py-2">
                <MapPin className="w-4 h-4 mr-2" />
                Live GPS Tracking Enabled
              </Badge>
            </div>
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
