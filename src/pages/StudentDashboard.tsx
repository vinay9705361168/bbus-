import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  GraduationCap, 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Download, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  School,
  CreditCard
} from "lucide-react";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get user data from navigation state or use mock data
  const user = location.state?.user || {
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

  const isPassValid = new Date(user.passValidityDate) > new Date();
  const daysUntilExpiry = Math.ceil((new Date(user.passValidityDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

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
              Student Dashboard
            </h1>
          </div>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20"
            onClick={() => navigate("/student-pass")}
          >
            Back to Student Pass
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <Card className="travel-card animate-slide-up">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user.picture} alt={user.name} />
                  <AvatarFallback className="text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">Welcome, {user.name}!</h2>
                  <p className="text-muted-foreground mb-4">
                    Your student pass dashboard is ready. Manage your bus pass and view your details below.
                  </p>
                  <div className="flex items-center gap-2">
                    {user.isVerified ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified Student
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Verification Pending
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Details */}
            <Card className="travel-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-medium">{user.age} years old</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center gap-3">
                    <School className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Institution</p>
                      <p className="font-medium">{user.college}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Student ID</p>
                      <p className="font-medium font-mono">{user.studentId}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pass Details */}
            <Card className="travel-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Student Pass Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">Pass Status</h4>
                    {isPassValid ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Expired
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pass Number:</span>
                      <span className="font-mono">SP{user.studentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valid Until:</span>
                      <span className={isPassValid ? "text-green-600" : "text-red-600"}>
                        {new Date(user.passValidityDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Days Remaining:</span>
                      <span className={daysUntilExpiry > 30 ? "text-green-600" : daysUntilExpiry > 7 ? "text-yellow-600" : "text-red-600"}>
                        {daysUntilExpiry > 0 ? `${daysUntilExpiry} days` : "Expired"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Route:</span>
                      <span>Route 1: Downtown to University</span>
                    </div>
                  </div>
                </div>

                {daysUntilExpiry <= 30 && daysUntilExpiry > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Pass Expiring Soon</span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">
                      Your pass expires in {daysUntilExpiry} days. Consider renewing it soon.
                    </p>
                  </div>
                )}

                <div className="space-y-2 pt-4">
                  <Button className="w-full" variant="default">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Renew Pass
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Digital Pass
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="travel-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => navigate("/search")}
                >
                  <MapPin className="w-6 h-6 text-primary" />
                  <div className="text-center">
                    <p className="font-medium">Find Buses</p>
                    <p className="text-xs text-muted-foreground">Search for bus routes</p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <Calendar className="w-6 h-6 text-primary" />
                  <div className="text-center">
                    <p className="font-medium">Schedule</p>
                    <p className="text-xs text-muted-foreground">View bus schedules</p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <RefreshCw className="w-6 h-6 text-primary" />
                  <div className="text-center">
                    <p className="font-medium">Live Tracking</p>
                    <p className="text-xs text-muted-foreground">Track buses in real-time</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
