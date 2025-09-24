import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft, CheckCircle } from "lucide-react";

export default function StudentPass() {
  const navigate = useNavigate();

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
          <Button variant="ghost" className="text-white hover:bg-white/20" onClick={() => navigate("/tickets")}>
            Back to Tickets
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Apply New Pass */}
            <Card className="travel-card animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Apply New Student Pass
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-6">Fill in your details to apply for a new student bus pass.</p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input id="studentId" placeholder="Enter your student ID" />
                  </div>
                  
                  <div>
                    <Label htmlFor="institution">Educational Institution</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your institution" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="university">University</SelectItem>
                        <SelectItem value="college">College</SelectItem>
                        <SelectItem value="school">School</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="route">Preferred Route</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your route" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="route1">Route 1: Downtown to University</SelectItem>
                        <SelectItem value="route2">Route 2: Suburbs to Campus</SelectItem>
                        <SelectItem value="route3">Route 3: City Center to College</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="validity">Pass Validity</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select validity period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly Pass</SelectItem>
                        <SelectItem value="semester">Semester Pass</SelectItem>
                        <SelectItem value="yearly">Yearly Pass</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full" variant="travel">
                    Apply for Student Pass
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Renew/Manage Pass */}
            <Card className="travel-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-500" />
                  Renew/Manage Pass
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-6">Manage your existing student pass or renew it.</p>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="passNumber">Pass Number</Label>
                    <Input id="passNumber" placeholder="Enter your pass number" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input id="phoneNumber" placeholder="Enter your phone number" />
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Current Pass Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Pass Number:</span>
                        <span className="font-mono">SP2024001</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Valid Until:</span>
                        <span className="text-green-600">Dec 31, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Route:</span>
                        <span>Route 1: Downtown to University</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 space-y-2">
                  <Button className="w-full" variant="travel">
                    Renew Pass
                  </Button>
                  <Button className="w-full" variant="outline">
                    Download Pass
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Benefits Section */}
          <div className="mt-12">
            <Card className="travel-card">
              <CardHeader>
                <CardTitle>Student Pass Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">💰</span>
                    </div>
                    <h3 className="font-semibold mb-2">50% Discount</h3>
                    <p className="text-sm text-muted-foreground">Get up to 50% discount on bus fares</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <h3 className="font-semibold mb-2">Valid for Students</h3>
                    <p className="text-sm text-muted-foreground">Exclusive benefits for students only</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🚌</span>
                    </div>
                    <h3 className="font-semibold mb-2">Unlimited Travel</h3>
                    <p className="text-sm text-muted-foreground">Travel unlimited times on your route</p>
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
