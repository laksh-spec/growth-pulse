import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  PlayCircle,
  LayoutGrid,
  BarChart3,
  TrendingUp,
  Settings,
  Menu,
  ChevronLeft,
  Bell,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Overview", path: "/" },
  { icon: PlayCircle, label: "Videos", path: "/videos" },
  { icon: LayoutGrid, label: "Categories", path: "/categories" },
  { icon: BarChart3, label: "GA Analytics", path: "/analytics" },
  { icon: TrendingUp, label: "Correlations", path: "/correlations" },
  { icon: Bell, label: "Alerts", path: "/alerts" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex flex-col bg-secondary transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              <Zap className="h-5 w-5" />
            </div>
            <span className="font-semibold text-secondary-foreground tracking-tight">
              Buyhatke
            </span>
          </div>
        )}
        {collapsed && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold mx-auto">
            <Zap className="h-5 w-5" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
            collapsed && "hidden"
          )}
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "sidebar-nav-item",
                isActive && "active",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-primary")} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={cn(
        "px-4 py-4 border-t border-sidebar-border",
        collapsed && "px-2"
      )}>
        {!collapsed && (
          <div className="text-xs text-sidebar-foreground/60">
            <p>PR + Growth Intelligence</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        )}
      </div>
    </aside>
  );
}
