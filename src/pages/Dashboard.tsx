import Layout from "@/components/Layout";
import DashboardCard from "@/components/DashboardCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  ClipboardCheck, 
  AlertTriangle, 
  FileText, 
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye
} from "lucide-react";

const Dashboard = () => {
  // Mock data for dashboard
  const kpis = [
    {
      title: "Total Registrations",
      value: "2,847",
      description: "Active registrations",
      icon: Users,
      trend: "up" as const,
      trendValue: "+12%",
      variant: "default" as const
    },
    {
      title: "Pending Inspections",
      value: "147",
      description: "Awaiting inspection",
      icon: ClipboardCheck,
      trend: "down" as const,
      trendValue: "-8%",
      variant: "warning" as const
    },
    {
      title: "Compliance Issues",
      value: "23",
      description: "Require attention",
      icon: AlertTriangle,
      trend: "down" as const,
      trendValue: "-15%",
      variant: "destructive" as const
    },
    {
      title: "Reports Generated",
      value: "1,204",
      description: "This month",
      icon: FileText,
      trend: "up" as const,
      trendValue: "+25%",
      variant: "success" as const
    }
  ];

  const recentInspections = [
    {
      id: "INS-001",
      company: "ABC Manufacturing Ltd.",
      inspector: "Dr. R. Sharma",
      type: "Form 9 - Factory Inspection",
      status: "completed",
      date: "2024-01-20",
      priority: "high"
    },
    {
      id: "INS-002", 
      company: "XYZ Chemical Works",
      inspector: "Er. M. Patel",
      type: "Form 27 - Boiler Inspection",
      status: "in-progress",
      date: "2024-01-22",
      priority: "medium"
    },
    {
      id: "INS-003",
      company: "DEF Steel Plant",
      inspector: "Dr. S. Kumar",
      type: "Form 15 - Pressure Vessel",
      status: "scheduled",
      date: "2024-01-25",
      priority: "high"
    }
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
          <Calendar className="h-3 w-3 mr-1" />
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

  return (
    <Layout userRole="admin">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-lg border border-border/50">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome to DISH Portal Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor industrial safety compliance, manage inspections, and track regulatory activities.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <DashboardCard key={index} {...kpi} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Inspections */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Recent Inspections</CardTitle>
                    <CardDescription>Latest inspection activities and status updates</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInspections.map((inspection) => (
                    <div 
                      key={inspection.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-foreground">{inspection.id}</span>
                          {getStatusBadge(inspection.status)}
                          {getPriorityBadge(inspection.priority)}
                        </div>
                        <h4 className="font-medium text-foreground mb-1">{inspection.company}</h4>
                        <p className="text-sm text-muted-foreground">{inspection.type}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Inspector: {inspection.inspector} • {inspection.date}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Alerts */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Frequently used functions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  New Registration
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  Schedule Inspection
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Compliance Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
                  Compliance Alerts
                </CardTitle>
                <CardDescription>Critical items requiring attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-md">
                  <p className="text-sm font-medium text-destructive">Overdue Inspections</p>
                  <p className="text-xs text-muted-foreground">5 inspections are past due date</p>
                </div>
                <div className="p-3 bg-warning/5 border border-warning/20 rounded-md">
                  <p className="text-sm font-medium text-warning">Pending Renewals</p>
                  <p className="text-xs text-muted-foreground">12 licenses expiring this month</p>
                </div>
                <div className="p-3 bg-info/5 border border-info/20 rounded-md">
                  <p className="text-sm font-medium text-info">New Regulations</p>
                  <p className="text-xs text-muted-foreground">3 new safety standards published</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;