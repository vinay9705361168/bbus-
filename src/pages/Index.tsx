import { useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bus, Clock, MapPin, Shield, Star, Ticket, GraduationCap, Mic, MicOff, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Translation dictionary
const translations = {
  en: {
    title: "Where is My Bus?",
    desc: "Track your bus in real-time.",
    form: {
      heading: 'Find Your Bus',
      subheading: 'Search for buses between stations',
      fromLabel: 'From Station',
      toLabel: 'To Station',
      fromPlaceholder: 'Enter departure station',
      toPlaceholder: 'Enter destination station',
      swap: 'Swap Stations',
      searchBtn: 'Search Buses'
    },
    gpsBadge: 'Live GPS Tracking Enabled',
    featuresTitle: 'Why Choose Our Platform?',
    featuresDesc: 'Experience the best in bus travel with our comprehensive booking platform'
  },
  hi: {
    title: "मेरी बस कहाँ है?",
    desc: "अपनी बस को वास्तविक समय में ट्रैक करें।",
    form: {
      heading: 'अपनी बस खोजें',
      subheading: 'स्टेशनों के बीच बसें खोजें',
      fromLabel: 'प्रस्थान स्टेशन',
      toLabel: 'गंतव्य स्टेशन',
      fromPlaceholder: 'प्रस्थान स्टेशन दर्ज करें',
      toPlaceholder: 'गंतव्य स्टेशन दर्ज करें',
      swap: 'स्टेशन बदलें',
      searchBtn: 'बसें खोजें'
    },
    gpsBadge: 'लाइव जीपीएस ट्रैकिंग सक्षम',
    featuresTitle: 'हमारा प्लेटफ़ॉर्म क्यों चुनें?',
    featuresDesc: 'हमारे व्यापक बुकिंग प्लेटफ़ॉर्म के साथ सर्वश्रेष्ठ बस यात्रा का अनुभव करें'
  },
  as: {
    title: "মোৰ বাচ ক'ত?",
    desc: "আপোনাৰ বাচ বাস্তৱ সময়ত ট্ৰেক কৰক।"
  },
  bn: {
    title: "আমার বাস কোথায়?",
    desc: "বাসটি রিয়েল-টাইমে ট্র্যাক করুন।"
  },
  brx: {
    title: "आंनि बस सिगां?",
    desc: "नोंथांनि बस रियल-टाइम ट्रेक खालाम।"
  },
  doi: {
    title: "मेरी बस कित्थे ऐ?",
    desc: "अपणी बस नूं असल समय च ट्रैक करो।"
  },
  gu: {
    title: "મારી બસ ક્યાં છે?",
    desc: "તમારી બસને વાસ્તવિક સમયમાં ટ્રેક કરો."
  },
  kn: {
    title: "ನನ್ನ ಬಸ್ ಎಲ್ಲಿದೆ?",
    desc: "ನಿಮ್ಮ ಬಸ್ಸನ್ನು ನಿಜವಾದ ಸಮಯದಲ್ಲಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ."
  },
  ks: {
    title: "میری بس کتھ چھُ؟",
    desc: "اپنی بس حقیقی وقت چھ ٹریک كریو۔"
  },
  kok: {
    title: "माझी बस कंय आसा?",
    desc: "तुमची बस वेळेवर ट्रॅक करात."
  },
  mai: {
    title: "हमर बस कतए अछि?",
    desc: "अपन बसकेँ वास्तविक समयमेँ ट्रैक करू।"
  },
  ml: {
    title: "എന്റെ ബസ് എവിടെയാണ്?",
    desc: "നിങ്ങളുടെ ബസ് യഥാർത്ഥ സമയത്ത് ട്രാക്ക് ചെയ്യുക."
  },
  mr: {
    title: "माझी बस कुठे आहे?",
    desc: "तुमची बस प्रत्यक्ष वेळेत ट्रॅक करा."
  },
  mni: {
    title: "ꯃꯃꯥꯡꯃꯥ ꯚꯔꯤꯁ ꯍꯧꯕꯥ?",
    desc: "ꯃꯍꯤ ꯚꯔꯤꯁ ꯑꯍꯧ ꯇꯧꯕ ꯂꯤꯌꯥꯛ ꯑꯃꯥ ꯃꯥꯡꯗ ꯇ꯭ꯔꯦꯛ ꯇꯧꯕꯥ."
  },
  ne: {
    title: "मेरो बस कहाँ छ?",
    desc: "तपाईंको बस वास्तविक समयमा ट्र्याक गर्नुहोस्।"
  },
  or: {
    title: "ମୋର ବସ୍ କେଉଁଠି?",
    desc: "ଆପଣଙ୍କ ବସ୍ କୁ ସଜିବା ସମୟରେ ଟ୍ରାକ୍ କରନ୍ତୁ।"
  },
  pa: {
    title: "ਮੇਰੀ ਬੱਸ ਕਿੱਥੇ ਹੈ?",
    desc: "ਆਪਣੀ ਬੱਸ ਨੂੰ ਅਸਲ ਸਮੇਂ 'ਚ ਟ੍ਰੈਕ ਕਰੋ।",
    form: {
      heading: 'ਆਪਣੀ ਬੱਸ ਲੱਭੋ',
      subheading: 'ਸਟੇਸ਼ਨਾਂ ਵਿਚਕਾਰ ਬੱਸਾਂ ਖੋਜੋ',
      fromLabel: 'ਰਵਾਨਗੀ ਸਟੇਸ਼ਨ',
      toLabel: 'ਗੰਤੀ ਸਟੇਸ਼ਨ',
      fromPlaceholder: 'ਰਵਾਨਗੀ ਸਟੇਸ਼ਨ ਦਰਜ ਕਰੋ',
      toPlaceholder: 'ਗੰਤੀ ਸਟੇਸ਼ਨ ਦਰਜ ਕਰੋ',
      swap: 'ਸਟੇਸ਼ਨ ਬਦਲੋ',
      searchBtn: 'ਬੱਸਾਂ ਖੋਜੋ'
    },
    gpsBadge: 'ਲਾਈਵ ਜੀਪੀਐਸ ਟ੍ਰੈਕਿੰਗ ਚਾਲੂ',
    featuresTitle: 'ਸਾਡਾ ਪਲੇਟਫਾਰਮ ਕਿਉਂ ਚੁਣੋ?',
    featuresDesc: 'ਸਾਡੇ ਸੰਪੂਰਨ ਬੁਕਿੰਗ ਪਲੇਟਫਾਰਮ ਨਾਲ ਸਭ ਤੋਂ ਵਧੀਆ ਬੱਸ ਯਾਤਰਾ ਦਾ ਤਜ਼ਰਬਾ'
  },
  sa: {
    title: "मम बसः कुत्र?",
    desc: "स्वस्य बसं वास्तविककाले अनुगच्छतु।"
  },
  sat: {
    title: "ᱟᱢᱟᱨ ᱵᱟᱥ ᱠᱟᱱᱟᱹ?",
    desc: "ᱚᱱᱚᱠᱚ ᱵᱟᱥ ᱨᱤᱭᱟᱹᱞ ᱴᱟᱭᱢᱽ ᱡᱚᱜᱚᱲ ᱠᱚ."
  },
  sd: {
    title: "منهنجي بس ڪٿي آهي؟",
    desc: "پنهنجي بس کي حقيقي وقت ۾ ٽريڪ ڪريو."
  },
  ta: {
    title: "என் பஸ் எங்கே?",
    desc: "உங்கள் பஸ்ஸை நேரடியாக கண்காணிக்கவும்."
  },
  te: {
    title: "నా బస్సు ఎక్కడ ఉంది?",
    desc: "మీ బస్సును నిజ సమయంలో ట్రాక్ చేయండి."
  },
  ur: {
    title: "میری بس کہاں ہے؟",
    desc: "اپنی بس کو حقیقی وقت میں ٹریک کریں۔"
  }
};

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isListening, setIsListening] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState("");
  const [showVoiceDialog, setShowVoiceDialog] = useState(false);
  const navigate = useNavigate();

  const changeLanguage = (language: string) => {
    setCurrentLanguage(language);
    console.log(`Language changed to: ${language}`);
  };

  // Voice Recognition functionality
  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setIsListening(true);
    setVoiceCommand("");

    recognition.onstart = () => {
      console.log('Voice recognition started');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setVoiceCommand(transcript);
      processVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Voice recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const processVoiceCommand = (command: string) => {
    console.log('Processing voice command:', command);
    
    // Speak the command back to user
    speakText(`You said: ${command}`);
    
    // Process different voice commands
    if (command.includes('book') || command.includes('ticket') || command.includes('buy')) {
      setTimeout(() => {
        speakText('Redirecting you to ticket booking section');
        navigate('/tickets');
      }, 2000);
    } else if (command.includes('from') && command.includes('to')) {
      // Extract stations from voice command
      const fromMatch = command.match(/from\s+(\w+)/);
      const toMatch = command.match(/to\s+(\w+)/);
      
      if (fromMatch && toMatch) {
        const fromStation = fromMatch[1];
        const toStation = toMatch[1];
        
        setTimeout(() => {
          speakText(`Searching for buses from ${fromStation} to ${toStation}`);
          navigate(`/search?from=${encodeURIComponent(fromStation)}&to=${encodeURIComponent(toStation)}`);
        }, 2000);
      }
    } else if (command.includes('help') || command.includes('what can you do')) {
      setTimeout(() => {
        speakText('I can help you search for buses between stations or redirect you to book tickets. Try saying "I want to travel from downtown to university" or "I want to book a ticket"');
      }, 1000);
    } else {
      setTimeout(() => {
        speakText('I didn\'t understand that. Try saying "I want to travel from station A to station B" or "I want to book a ticket"');
      }, 1000);
    }
  };

  const speakText = (text: string) => {
    if (!text.trim()) return;
    
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-US';
    
    window.speechSynthesis.speak(utterance);
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
      title: "Ticket Booking",
      description: "Verified operators and secure payment gateway"
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Voice Assist",
      description: "Use voice commands to search buses and book tickets"
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
            <div className="mb-8 flex flex-col items-center gap-4">
              <Badge variant="secondary" className="text-primary font-semibold px-4 py-2">
                <MapPin className="w-4 h-4 mr-2" />
                {(translations[currentLanguage as keyof typeof translations] as any).gpsBadge ?? 'Live GPS Tracking Enabled'}
              </Badge>
              
              {/* Voice Assist Button */}
              <Button
                onClick={startVoiceRecognition}
                disabled={isListening}
                className={`bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 transition-all duration-300 px-6 py-3 rounded-full font-semibold ${
                  isListening ? 'animate-pulse bg-red-500/20 border-red-400' : ''
                }`}
                title="Click to start voice commands"
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5 mr-2 animate-pulse" />
                    Listening... Click to stop
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Voice Assist
                  </>
                )}
              </Button>
              
              {voiceCommand && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-sm">
                  <span className="text-white/80">You said: </span>
                  <span className="text-white font-medium">"{voiceCommand}"</span>
                </div>
              )}
            </div>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <SearchForm i18n={(translations[currentLanguage as keyof typeof translations] as any).form} />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{(translations[currentLanguage as keyof typeof translations] as any).featuresTitle ?? 'Why Choose Our Platform?'}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {(translations[currentLanguage as keyof typeof translations] as any).featuresDesc ?? 'Experience the best in bus travel with our comprehensive booking platform'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`travel-card text-center animate-scale-in ${feature.title === "Ticket Booking" ? "cursor-pointer hover:shadow-lg transition-shadow" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={feature.title === "Ticket Booking" ? () => {} : undefined}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  {feature.title === "Ticket Booking" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="mt-4 w-full">
                          Book Tickets
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Choose Booking Type</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 gap-4 py-4">
                          <Card 
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => navigate("/student-pass")}
                          >
                            <CardContent className="p-4 text-center">
                              <GraduationCap className="w-8 h-8 mx-auto mb-2 text-primary" />
                              <h3 className="font-semibold mb-1">Student Pass</h3>
                              <p className="text-sm text-muted-foreground">Apply for or renew student bus passes</p>
                            </CardContent>
                          </Card>
                          <Card 
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => navigate("/general-tickets")}
                          >
                            <CardContent className="p-4 text-center">
                              <Ticket className="w-8 h-8 mx-auto mb-2 text-primary" />
                              <h3 className="font-semibold mb-1">General Tickets</h3>
                              <p className="text-sm text-muted-foreground">Book tickets for daily commuting</p>
                            </CardContent>
                          </Card>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Voice Assist Help Dialog */}
      <div className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Voice Commands Help</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn how to use voice commands to search for buses and book tickets
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="travel-card">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Volume2 className="w-5 h-5 text-primary" />
                      Search for Buses
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="font-medium">"I want to travel from downtown to university"</p>
                        <p className="text-sm text-muted-foreground">Searches for buses between stations</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="font-medium">"Show me buses from airport to city center"</p>
                        <p className="text-sm text-muted-foreground">Alternative way to search</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Ticket className="w-5 h-5 text-primary" />
                      Book Tickets
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="font-medium">"I want to book a ticket"</p>
                        <p className="text-sm text-muted-foreground">Redirects to ticket booking</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="font-medium">"I want to buy a ticket"</p>
                        <p className="text-sm text-muted-foreground">Alternative booking command</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">How to Use:</h3>
                  <ol className="space-y-2 text-sm">
                    <li>1. Click the "Voice Assist" button in the hero section</li>
                    <li>2. Allow microphone access when prompted</li>
                    <li>3. Speak your command clearly</li>
                    <li>4. The system will respond and take action</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-muted/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 Bus Tracking Platform. Safe travels with real-time tracking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
