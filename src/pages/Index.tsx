import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  ClipboardCheck, 
  Users, 
  BarChart3, 
  FileText, 
  MessageSquare, 
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Registration Management",
      description: "Streamlined application process for competent persons, inspectors, and industry licenses."
    },
    {
      icon: ClipboardCheck,
      title: "Inspection Scheduling",
      description: "Comprehensive inspection management with 11+ standardized forms and workflow tracking."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Real-time insights with compliance heatmaps, regional performance, and trend analysis."
    },
    {
      icon: MessageSquare,
      title: "Communications Hub",
      description: "Integrated notification system with email, SMS, and in-app messaging capabilities."
    },
    {
      icon: FileText,
      title: "Document Workflow",
      description: "Digital document management with approval tracking and compliance monitoring."
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Role-based access control with government-grade security standards."
    }
  ];

  const userTypes = [
    { type: "Industry", description: "Manage registrations and track compliance status", icon: "🏭" },
    { type: "Inspector", description: "Conduct inspections and submit reports digitally", icon: "🔍" },
    { type: "Competent Person", description: "Review assigned inspections and manage certifications", icon: "👨‍🔬" },
    { type: "DISH Admin", description: "Oversee all operations and analytics", icon: "⚙️" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">DISH Portal</h1>
                <p className="text-xs text-muted-foreground">Directorate of Industrial Safety and Health</p>
              </div>
            </div>
            <Button onClick={() => navigate("/login")} className="shadow-sm">
              Sign In
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <Star className="h-4 w-4 mr-2" />
            Government of India Initiative
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            DISH Registration &<br />
            <span className="text-primary">Inspection Management</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Streamline industrial safety compliance with our comprehensive digital platform for 
            registration management, inspection scheduling, and regulatory oversight.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/login")}
              className="shadow-lg"
            >
              Access Portal
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="shadow-sm"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* User Types */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Portal Access for All Stakeholders</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Role-based access ensuring each user type has the tools and information they need.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userTypes.map((user, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all border-border/50">
              <CardHeader className="pb-4">
                <div className="text-4xl mb-3">{user.icon}</div>
                <CardTitle className="text-lg">{user.type}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{user.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Comprehensive Safety Management</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage industrial safety compliance in one integrated platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all border-border/50">
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 border-y border-border/50">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the digital transformation of industrial safety management. 
            Access the portal to begin your registration or inspection workflow.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/login")}
            className="shadow-lg"
          >
            Access DISH Portal
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold text-foreground">DISH Portal</p>
                <p className="text-xs text-muted-foreground">Ministry of Labour and Employment, Government of India</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms of Service</a>
              <a href="#" className="hover:text-primary">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
