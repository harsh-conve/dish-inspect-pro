import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Building, User, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [userType, setUserType] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const userTypes = [
    { value: "industry", label: "Industry", icon: Building },
    { value: "competent_person", label: "Competent Person", icon: UserCheck },
    { value: "inspector", label: "Inspector", icon: User },
    { value: "admin", label: "DISH Admin", icon: Shield },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userType || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: `Welcome to DISH Portal`,
      });
      navigate("/dashboard");
    }, 1500);
  };

  const getSelectedIcon = () => {
    const selected = userTypes.find(type => type.value === userType);
    return selected?.icon || Shield;
  };

  const SelectedIcon = getSelectedIcon();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">DISH Portal</h1>
          <p className="text-muted-foreground mt-2">
            Directorate of Industrial Safety and Health
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg border-border/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* User Type Selection */}
              <div className="space-y-2">
                <Label htmlFor="userType">User Type</Label>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      {userType && <SelectedIcon className="h-4 w-4" />}
                      <SelectValue placeholder="Select user type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {userTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              {/* Additional Links */}
              <div className="text-center space-y-2 pt-4">
                <Button variant="link" size="sm">
                  Forgot Password?
                </Button>
                <div className="text-xs text-muted-foreground">
                  Need help? Contact DISH Support
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-muted-foreground">
          <p>Government of India | Ministry of Labour and Employment</p>
        </div>
      </div>
    </div>
  );
};

export default Login;