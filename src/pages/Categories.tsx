import { LayoutGrid, ChevronRight } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { CategoryBarChart } from "@/components/dashboard/CategoryBarChart";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { mockCategoryData } from "@/data/mockData";

const categoryDetails = [
  {
    name: "Cab Comparison",
    description: "Uber, Ola, Rapido comparisons",
    videos: 24,
    totalViews: "2.4M",
    avgEngagement: "4.2%",
    topCreator: "Tech Burner",
    status: "success" as const,
    metrics: {
      searches: 45200,
      appInstalls: 3800,
      extInstalls: 2100,
    },
  },
  {
    name: "Price Comparison",
    description: "Amazon, Flipkart price tracking",
    videos: 18,
    totalViews: "1.8M",
    avgEngagement: "3.8%",
    topCreator: "Trakin Tech",
    status: "info" as const,
    metrics: {
      searches: 38500,
      appInstalls: 3200,
      extInstalls: 1850,
    },
  },
  {
    name: "Deals",
    description: "Sale announcements & deals",
    videos: 32,
    totalViews: "1.2M",
    avgEngagement: "3.5%",
    topCreator: "Technical Guruji",
    status: "warning" as const,
    metrics: {
      searches: 28900,
      appInstalls: 2400,
      extInstalls: 1200,
    },
  },
  {
    name: "Awareness",
    description: "Brand awareness content",
    videos: 12,
    totalViews: "680K",
    avgEngagement: "4.5%",
    topCreator: "Geeky Ranjit",
    status: "error" as const,
    metrics: {
      searches: 18500,
      appInstalls: 1500,
      extInstalls: 890,
    },
  },
  {
    name: "Education",
    description: "How-to guides & tutorials",
    videos: 15,
    totalViews: "520K",
    avgEngagement: "5.2%",
    topCreator: "Tech With Tim",
    status: "success" as const,
    metrics: {
      searches: 12400,
      appInstalls: 980,
      extInstalls: 650,
    },
  },
];

export default function Categories() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <LayoutGrid className="h-4 w-4" />
          <span>Content</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Categories</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Content Categories</h1>
        <p className="text-muted-foreground">
          Analyze performance by content category
        </p>
      </div>

      {/* Overview Chart */}
      <div className="mb-6">
        <ChartCard title="Category Performance Overview" subtitle="Total views by content type">
          <CategoryBarChart data={mockCategoryData} />
        </ChartCard>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryDetails.map((category) => (
          <div
            key={category.name}
            className="bg-card rounded-xl border border-border/50 overflow-hidden hover:shadow-card transition-shadow cursor-pointer"
          >
            <div className="bg-card-header px-5 py-3 flex items-center justify-between">
              <span className="font-medium text-card-header-foreground">
                {category.name}
              </span>
              <StatusBadge status={category.status} label={`${category.videos} videos`} />
            </div>
            <div className="p-5">
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Total Views
                  </p>
                  <p className="text-lg font-semibold">{category.totalViews}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Engagement
                  </p>
                  <p className="text-lg font-semibold">{category.avgEngagement}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Product Metrics Correlation
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Searches</span>
                  <span className="font-medium">{category.metrics.searches.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">App Installs</span>
                  <span className="font-medium">{category.metrics.appInstalls.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ext Installs</span>
                  <span className="font-medium">{category.metrics.extInstalls.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
