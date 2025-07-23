import { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  ClipboardCheck, 
  FileText, 
  Settings, 
  BarChart3, 
  MessageSquare,
  LogOut,
  Bell
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  userRole?: "industry" | "competent_person" | "inspector" | "admin";
}

const Layout = ({ children, userRole = "admin" }: LayoutProps) => {
  const location = useLocation();

  const getNavigationItems = () => {
    const baseItems = [
      { icon: Home, label: "Dashboard", path: "/dashboard" },
    ];

    switch (userRole) {
      case "admin":
        return [
          ...baseItems,
          { icon: Users, label: "Registration", path: "/registration" },
          { icon: ClipboardCheck, label: "Inspections", path: "/inspections" },
          { icon: FileText, label: "Documents", path: "/documents" },
          { icon: Settings, label: "Rules & Alerts", path: "/rules" },
          { icon: BarChart3, label: "Analytics", path: "/analytics" },
          { icon: MessageSquare, label: "Communications", path: "/communications" },
        ];
      case "inspector":
        return [
          ...baseItems,
          { icon: ClipboardCheck, label: "My Inspections", path: "/inspections" },
          { icon: FileText, label: "Reports", path: "/reports" },
          { icon: MessageSquare, label: "Communications", path: "/communications" },
        ];
      case "industry":
        return [
          ...baseItems,
          { icon: Users, label: "Registration", path: "/registration" },
          { icon: ClipboardCheck, label: "Inspection Status", path: "/inspection-status" },
          { icon: FileText, label: "Documents", path: "/documents" },
        ];
      case "competent_person":
        return [
          ...baseItems,
          { icon: ClipboardCheck, label: "Assigned Inspections", path: "/assigned-inspections" },
          { icon: FileText, label: "Reports", path: "/reports" },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border shadow-lg">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold text-foreground">DISH Portal</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Directorate of Industrial Safety
          </p>
        </div>

        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                isActive(item.path)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {navigationItems.find(item => isActive(item.path))?.label || "Dashboard"}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">DISH Admin</p>
                  <p className="text-xs text-muted-foreground capitalize">{userRole.replace('_', ' ')}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;