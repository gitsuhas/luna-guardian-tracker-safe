
import { Link, useLocation } from "react-router-dom";
import { Calendar, Home, MessageSquare, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Period Tracker', path: '/period-tracker', icon: Calendar },
    { name: 'Health Chat', path: '/health-chat', icon: MessageSquare },
    { name: 'Safety Hub', path: '/safety-hub', icon: Shield }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="rounded-full bg-luna-purple p-1">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <span className="text-lg font-semibold text-foreground">Luna Guard</span>
        </Link>
        
        <div className="ml-auto flex space-x-1 md:space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                location.pathname === item.path
                  ? "bg-luna-purple text-white"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
