import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  User, 
  Building, 
  FileText, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Download
} from "lucide-react";

const Registration = () => {
  const [activeTab, setActiveTab] = useState("new-application");
  const { toast } = useToast();

  // Mock data for existing applications
  const applications = [
    {
      id: "REG-2024-001",
      applicantName: "Dr. Rajesh Kumar",
      company: "ABC Manufacturing Ltd.",
      type: "Competent Person",
      status: "approved",
      submittedDate: "2024-01-15",
      reviewDate: "2024-01-18"
    },
    {
      id: "REG-2024-002",
      applicantName: "Er. Priya Sharma",
      company: "XYZ Chemical Works",
      type: "Factory Registration",
      status: "under-review",
      submittedDate: "2024-01-20",
      reviewDate: "-"
    },
    {
      id: "REG-2024-003",
      applicantName: "Mr. Anil Patel",
      company: "DEF Steel Plant",
      type: "Inspector Certification",
      status: "pending",
      submittedDate: "2024-01-22",
      reviewDate: "-"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
          <CheckCircle className="h-3 w-3 mr-1" />
          Approved
        </Badge>;
      case "under-review":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
          <Clock className="h-3 w-3 mr-1" />
          Under Review
        </Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-info/10 text-info border-info/20">
          <AlertCircle className="h-3 w-3 mr-1" />
          Pending
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted",
      description: "Your registration application has been submitted successfully.",
    });
  };

  return (
    <Layout userRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Registration Management</h1>
          <p className="text-muted-foreground">
            Manage registration applications for competent persons, inspectors, and industry licenses.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="new-application">New Application</TabsTrigger>
            <TabsTrigger value="pending-applications">Pending Applications</TabsTrigger>
            <TabsTrigger value="approved-applications">Approved Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="new-application" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  New Registration Application
                </CardTitle>
                <CardDescription>
                  Submit a new registration for competent person, inspector, or industry license.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Application Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="applicationType">Application Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select application type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="competent-person">Competent Person</SelectItem>
                          <SelectItem value="inspector">Inspector Certification</SelectItem>
                          <SelectItem value="factory">Factory Registration</SelectItem>
                          <SelectItem value="license">Industrial License</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" placeholder="Enter full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="Enter email address" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Enter phone number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="aadhaar">Aadhaar Number</Label>
                        <Input id="aadhaar" placeholder="Enter Aadhaar number" />
                      </div>
                    </div>
                  </div>

                  {/* Professional Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Professional Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="qualification">Highest Qualification</Label>
                        <Input id="qualification" placeholder="Enter qualification" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input id="experience" type="number" placeholder="Enter years of experience" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Area of Specialization</Label>
                      <Textarea 
                        id="specialization" 
                        placeholder="Describe your area of specialization"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Document Upload</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Educational Certificates</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">PDF, JPG, PNG (max 5MB)</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Experience Certificates</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">PDF, JPG, PNG (max 5MB)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      Submit Application
                    </Button>
                    <Button type="button" variant="outline">
                      Save as Draft
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending-applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Applications</CardTitle>
                <CardDescription>Applications awaiting review and approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.filter(app => app.status !== "approved").map((application) => (
                    <div 
                      key={application.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-foreground">{application.id}</span>
                          {getStatusBadge(application.status)}
                        </div>
                        <h4 className="font-medium text-foreground">{application.applicantName}</h4>
                        <p className="text-sm text-muted-foreground">{application.company}</p>
                        <p className="text-sm text-muted-foreground">{application.type}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Submitted: {application.submittedDate}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved-applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Approved Applications</CardTitle>
                <CardDescription>Successfully approved registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.filter(app => app.status === "approved").map((application) => (
                    <div 
                      key={application.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-foreground">{application.id}</span>
                          {getStatusBadge(application.status)}
                        </div>
                        <h4 className="font-medium text-foreground">{application.applicantName}</h4>
                        <p className="text-sm text-muted-foreground">{application.company}</p>
                        <p className="text-sm text-muted-foreground">{application.type}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Approved: {application.reviewDate}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Certificate
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Registration;