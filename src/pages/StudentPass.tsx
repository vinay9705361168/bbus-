import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft, CheckCircle, Mail, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function StudentPass() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(true);

  // Mock Google login function
  const handleGoogleLogin = () => {
    // In a real implementation, this would integrate with Google OAuth
    const mockGoogleUser = {
      id: "google_123456789",
      name: "John Doe",
      email: "john.doe@university.edu",
      picture: "https://via.placeholder.com/150",
      age: 20,
      college: "State University",
      studentId: "SU2024001",
      passValidityDate: "2024-12-31",
      isVerified: true
    };
    
    // Simulate Google OAuth flow
    setTimeout(() => {
      navigate("/student-dashboard", { state: { user: mockGoogleUser } });
    }, 2000);
  };

  if (isAuthenticated) {
    navigate("/student-dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero text-white py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20" 
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <GraduationCap className="w-8 h-8" />
              Student Pass
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Login Required Card */}
          <Card className="travel-card animate-slide-up">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <GraduationCap className="w-8 h-8 text-primary" />
                Student Authentication Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-6">
                  Please sign in with your Google account to access your student pass details and manage your bus pass.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold mb-2">What you'll get access to:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 text-left">
                    <li>• View your student pass details</li>
                    <li>• Check pass validity and expiration</li>
                    <li>• Renew or apply for new passes</li>
                    <li>• Download digital pass</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 flex items-center justify-center gap-3 py-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {isLoading ? "Signing in..." : "Continue with Google"}
                </Button>
                
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="mt-8">
            <Card className="travel-card">
              <CardHeader>
                <CardTitle className="text-center">Student Pass Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">💰</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">50% Discount</h3>
                      <p className="text-sm text-muted-foreground">Get up to 50% discount on bus fares</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">🎓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Student Exclusive</h3>
                      <p className="text-sm text-muted-foreground">Exclusive benefits for verified students</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">🚌</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Unlimited Travel</h3>
                      <p className="text-sm text-muted-foreground">Travel unlimited times on your route</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

