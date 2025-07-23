import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter
} from "lucide-react";

const Analytics = () => {
  // Mock data for analytics
  const regionData = [
    { region: "Maharashtra", total: 450, completed: 380, pending: 70, compliance: 85 },
    { region: "Gujarat", total: 320, completed: 280, pending: 40, compliance: 88 },
    { region: "Tamil Nadu", total: 280, completed: 240, pending: 40, compliance: 86 },
    { region: "Karnataka", total: 250, completed: 200, pending: 50, compliance: 80 },
    { region: "West Bengal", total: 180, completed: 150, pending: 30, compliance: 83 }
  ];

  const complianceAlerts = [
    { 
      facility: "ABC Manufacturing Ltd.", 
      location: "Mumbai, MH", 
      issue: "Overdue boiler inspection", 
      severity: "high", 
      daysOverdue: 15 
    },
    { 
      facility: "XYZ Chemical Works", 
      location: "Pune, MH", 
      issue: "Safety equipment certification expired", 
      severity: "medium", 
      daysOverdue: 7 
    },
    { 
      facility: "DEF Steel Plant", 
      location: "Chennai, TN", 
      issue: "Environmental compliance review due", 
      severity: "low", 
      daysOverdue: 3 
    }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 85) return "text-success";
    if (compliance >= 70) return "text-warning";
    return "text-destructive";
  };

  return (
    <Layout userRole="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">BI & Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into inspection performance, compliance trends, and regional statistics.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Inspections</p>
                  <p className="text-2xl font-bold text-foreground">1,480</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-success mt-2">↗ +8.2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Compliance</p>
                  <p className="text-2xl font-bold text-foreground">84.5%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <p className="text-xs text-success mt-2">↗ +2.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                  <p className="text-2xl font-bold text-foreground">230</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
              <p className="text-xs text-destructive mt-2">↗ +5.3% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical Alerts</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <p className="text-xs text-success mt-2">↘ -15% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Region-wise Performance */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Region-wise Performance
                    </CardTitle>
                    <CardDescription>Inspection statistics and compliance rates by region</CardDescription>
                  </div>
                  <Select defaultValue="last-quarter">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-quarter">Last Quarter</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionData.map((region, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{region.region}</h4>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">{region.total} total</span>
                          <span className={`font-medium ${getComplianceColor(region.compliance)}`}>
                            {region.compliance}%
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-success h-full transition-all"
                            style={{ width: `${(region.completed / region.total) * 100}%` }}
                          />
                        </div>
                        <div className="w-16 bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-warning h-full transition-all"
                            style={{ width: `${(region.pending / region.total) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{region.completed} completed</span>
                        <span>{region.pending} pending</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Heatmap */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Compliance Alerts
                </CardTitle>
                <CardDescription>Critical compliance issues requiring attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {complianceAlerts.map((alert, index) => (
                  <div key={index} className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-foreground text-sm">{alert.facility}</h5>
                      {getSeverityBadge(alert.severity)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{alert.issue}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {alert.location}
                      </span>
                      <span className="text-destructive font-medium">
                        {alert.daysOverdue} days overdue
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Monthly Trends
              </CardTitle>
              <CardDescription>Inspection volume and compliance trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/10 rounded-lg border border-dashed border-border">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Interactive Chart Placeholder</p>
                  <p className="text-xs text-muted-foreground">Monthly inspection trends visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Compliance Heatmap
              </CardTitle>
              <CardDescription>Geographic distribution of compliance rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/10 rounded-lg border border-dashed border-border">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Geographic Heatmap Placeholder</p>
                  <p className="text-xs text-muted-foreground">Regional compliance visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
            <CardDescription>Download reports and analytics data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="flex items-center justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export Regional Report (PDF)
              </Button>
              <Button variant="outline" className="flex items-center justify-start">
                <Download className="h-4 w-4 mr-2" />
                Download Compliance Data (Excel)
              </Button>
              <Button variant="outline" className="flex items-center justify-start">
                <Download className="h-4 w-4 mr-2" />
                Generate Summary Report (PDF)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Analytics;