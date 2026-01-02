import { Home, ChevronRight, Eye, Download, Users, Search } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RealTimePanel } from "@/components/dashboard/RealTimePanel";
import { VideoTable } from "@/components/dashboard/VideoTable";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { CategoryBarChart } from "@/components/dashboard/CategoryBarChart";
import { Button } from "@/components/ui/button";
import {
  mockKpiData,
  mockPerformanceData,
  mockCategoryData,
  mockVideos,
} from "@/data/mockData";

export default function Overview() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Home className="h-4 w-4" />
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Dashboard</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Overview</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          title="Total Views"
          value={mockKpiData.totalViews.value}
          trend={mockKpiData.totalViews.trend}
          icon={<Eye className="h-4 w-4" />}
        />
        <KpiCard
          title="New Installs"
          value={mockKpiData.newInstalls.value}
          trend={mockKpiData.newInstalls.trend}
          icon={<Download className="h-4 w-4" />}
        />
        <KpiCard
          title="Extension Users"
          value={mockKpiData.extensionUsers.value}
          trend={mockKpiData.extensionUsers.trend}
          icon={<Users className="h-4 w-4" />}
        />
        <KpiCard
          title="Search Volume"
          value={mockKpiData.searchVolume.value}
          trend={mockKpiData.searchVolume.trend}
          icon={<Search className="h-4 w-4" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Performance Chart - Spans 2 columns */}
        <ChartCard
          title="Performance Metrics"
          subtitle="Views, Installs & Searches over time"
          className="lg:col-span-2"
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                Daily
              </Button>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                Weekly
              </Button>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                Monthly
              </Button>
            </div>
          }
        >
          <PerformanceChart data={mockPerformanceData} />
        </ChartCard>

        {/* Real-Time Panel */}
        <RealTimePanel />
      </div>

      {/* Secondary Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Category Performance */}
        <ChartCard title="Category Performance" subtitle="Views by content category">
          <CategoryBarChart data={mockCategoryData} />
        </ChartCard>

        {/* Top Videos Table - Spans 2 columns */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border/50 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h3 className="font-semibold text-foreground">Top Performing Videos</h3>
              <p className="text-sm text-muted-foreground">
                Videos with highest view growth this month
              </p>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <VideoTable videos={mockVideos} />
        </div>
      </div>
    </DashboardLayout>
  );
}
