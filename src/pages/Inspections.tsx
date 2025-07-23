import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  CalendarIcon,
  ClipboardCheck, 
  FileText, 
  Clock,
  MapPin,
  User,
  Building,
  AlertCircle,
  CheckCircle,
  Eye,
  Edit,
  Plus
} from "lucide-react";

const Inspections = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { toast } = useToast();

  // Mock data for inspections
  const inspections = [
    {
      id: "INS-001",
      company: "ABC Manufacturing Ltd.",
      location: "Mumbai, Maharashtra",
      inspector: "Dr. R. Sharma",
      form: "Form 9 - Factory Inspection",
      scheduledDate: "2024-01-25",
      status: "scheduled",
      priority: "high",
      type: "routine"
    },
    {
      id: "INS-002",
      company: "XYZ Chemical Works",
      location: "Pune, Maharashtra", 
      inspector: "Er. M. Patel",
      form: "Form 27 - Boiler Inspection",
      scheduledDate: "2024-01-26",
      status: "in-progress",
      priority: "medium",
      type: "compliance"
    },
    {
      id: "INS-003",
      company: "DEF Steel Plant",
      location: "Chennai, Tamil Nadu",
      inspector: "Dr. S. Kumar",
      form: "Form 15 - Pressure Vessel",
      scheduledDate: "2024-01-28",
      status: "completed",
      priority: "high",
      type: "incident"
    }
  ];

  const inspectionForms = [
    "Form 9 - Factory Inspection",
    "Form 15 - Pressure Vessel Inspection",
    "Form 23 - Lifting Machine Inspection",
    "Form 25 - Steam Boiler Inspection",
    "Form 27 - Air Receiver Inspection",
    "Form 30 - Hazardous Process Inspection",
    "Form 35 - Safety Audit",
    "Form 40 - Environmental Impact",
    "Form 45 - Fire Safety Inspection",
    "Form 50 - Chemical Storage Inspection",
    "Form 55 - Emergency Response Audit"
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>;
      case "in-progress":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
          <Clock className="h-3 w-3 mr-1" />
          In Progress
        </Badge>;
      case "scheduled":
        return <Badge variant="secondary" className="bg-info/10 text-info border-info/20">
          <CalendarIcon className="h-3 w-3 mr-1" />
          Scheduled
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inspection Scheduled",
      description: "The inspection has been scheduled successfully.",
    });
  };

  return (
    <Layout userRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Inspection Management</h1>
          <p className="text-muted-foreground">
            Schedule, manage, and track industrial safety inspections across all facilities.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schedule">Schedule Inspection</TabsTrigger>
            <TabsTrigger value="active">Active Inspections</TabsTrigger>
            <TabsTrigger value="reports">Reports & Drafts</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Schedule New Inspection
                </CardTitle>
                <CardDescription>
                  Create a new inspection schedule with assigned inspector and inspection form.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSchedule} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company/Facility</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="abc-manufacturing">ABC Manufacturing Ltd.</SelectItem>
                          <SelectItem value="xyz-chemical">XYZ Chemical Works</SelectItem>
                          <SelectItem value="def-steel">DEF Steel Plant</SelectItem>
                          <SelectItem value="ghi-textiles">GHI Textiles Pvt Ltd</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inspector">Assigned Inspector</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inspector" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dr-sharma">Dr. R. Sharma</SelectItem>
                          <SelectItem value="er-patel">Er. M. Patel</SelectItem>
                          <SelectItem value="dr-kumar">Dr. S. Kumar</SelectItem>
                          <SelectItem value="er-singh">Er. A. Singh</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Inspection Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="form">Inspection Form</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inspection form" />
                        </SelectTrigger>
                        <SelectContent>
                          {inspectionForms.map((form, index) => (
                            <SelectItem key={index} value={form.toLowerCase().replace(/\s+/g, '-')}>
                              {form}
                            </SelectItem>
                          ))}
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
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Date and Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Inspection Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Inspection Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inspection type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="routine">Routine Inspection</SelectItem>
                          <SelectItem value="compliance">Compliance Check</SelectItem>
                          <SelectItem value="incident">Incident Investigation</SelectItem>
                          <SelectItem value="followup">Follow-up Inspection</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1">
                      <ClipboardCheck className="h-4 w-4 mr-2" />
                      Schedule Inspection
                    </Button>
                    <Button type="button" variant="outline">
                      Save as Draft
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Inspections</CardTitle>
                    <CardDescription>Currently scheduled and in-progress inspections</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Calendar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inspections.filter(inspection => inspection.status !== "completed").map((inspection) => (
                    <div 
                      key={inspection.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-foreground">{inspection.id}</span>
                          {getStatusBadge(inspection.status)}
                          {getPriorityBadge(inspection.priority)}
                        </div>
                        <h4 className="font-medium text-foreground mb-1">{inspection.company}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {inspection.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {inspection.inspector}
                          </span>
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {inspection.scheduledDate}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{inspection.form}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Drafts</CardTitle>
                <CardDescription>Inspection reports in various stages of completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">Draft Report - INS-001</h4>
                        <p className="text-sm text-muted-foreground">ABC Manufacturing Ltd. - Form 9 Inspection</p>
                        <p className="text-xs text-muted-foreground mt-1">Last edited: 2 hours ago</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Continue
                        </Button>
                        <Button variant="default" size="sm">
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">Pending Review - INS-002</h4>
                        <p className="text-sm text-muted-foreground">XYZ Chemical Works - Form 27 Inspection</p>
                        <p className="text-xs text-muted-foreground mt-1">Submitted for approval: 1 day ago</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Inspections</CardTitle>
                <CardDescription>Successfully completed inspection records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inspections.filter(inspection => inspection.status === "completed").map((inspection) => (
                    <div 
                      key={inspection.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-foreground">{inspection.id}</span>
                          {getStatusBadge(inspection.status)}
                        </div>
                        <h4 className="font-medium text-foreground mb-1">{inspection.company}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {inspection.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {inspection.inspector}
                          </span>
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {inspection.scheduledDate}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{inspection.form}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View Report
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
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

export default Inspections;