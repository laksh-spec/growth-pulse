import { useState } from "react";
import { PlayCircle, ChevronRight, Plus, Filter, Search, DollarSign, Users, Video, TrendingUp } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { VideoTable } from "@/components/dashboard/VideoTable";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockVideos } from "@/data/mockData";

const categories = ["All Categories", "Cab Comparison", "Price Comparison", "Deals", "Awareness", "Education"];

// Extended mock data with ownership info
const extendedVideos = mockVideos.map((video, index) => ({
  ...video,
  owner: index < 2 ? "you" : "team",
  payout: Math.floor(Math.random() * 50000) + 5000,
  status: index % 3 === 0 ? "paid" : index % 3 === 1 ? "pending" : "processing",
}));

const yourVideos = extendedVideos.filter(v => v.owner === "you");
const teamVideos = extendedVideos.filter(v => v.owner === "team");

export default function Videos() {
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getFilteredVideos = (videos: typeof extendedVideos) => {
    return videos.filter((video) => {
      const matchesCategory = categoryFilter === "All Categories" || video.category === categoryFilter;
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const currentVideos = activeTab === "all" 
    ? getFilteredVideos(extendedVideos)
    : activeTab === "your" 
    ? getFilteredVideos(yourVideos)
    : getFilteredVideos(teamVideos);

  const totalPayout = extendedVideos.reduce((acc, v) => acc + v.payout, 0);
  const pendingPayout = extendedVideos.filter(v => v.status === "pending").reduce((acc, v) => acc + v.payout, 0);
  const paidPayout = extendedVideos.filter(v => v.status === "paid").reduce((acc, v) => acc + v.payout, 0);

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <PlayCircle className="h-4 w-4" />
          <span>Content</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Videos</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Video Library</h1>
            <p className="text-muted-foreground">
              Track and analyze YouTube video performance
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Video
          </Button>
        </div>
      </div>

      {/* Payout KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <KpiCard
          title="Total Videos"
          value={extendedVideos.length}
          trend={{ value: 12, label: "this month" }}
          icon={<Video className="h-4 w-4" />}
        />
        <KpiCard
          title="Total Payout"
          value={`₹${(totalPayout / 1000).toFixed(1)}K`}
          trend={{ value: 18.5, label: "vs last month" }}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <KpiCard
          title="Pending Payout"
          value={`₹${(pendingPayout / 1000).toFixed(1)}K`}
          trend={{ value: -5.2, label: "processing" }}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <KpiCard
          title="Team Creators"
          value="8"
          trend={{ value: 2, label: "new this month" }}
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      {/* Tabs for Video Sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all" className="gap-2">
              <Video className="h-4 w-4" />
              All Videos
              <span className="ml-1 text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                {extendedVideos.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="your" className="gap-2">
              Your Videos
              <span className="ml-1 text-xs bg-success/20 text-success px-1.5 py-0.5 rounded-full">
                {yourVideos.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2">
              Team Videos
              <span className="ml-1 text-xs bg-info/20 text-info px-1.5 py-0.5 rounded-full">
                {teamVideos.length}
              </span>
            </TabsTrigger>
          </TabsList>

          {/* Filters */}
          <div className="flex gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <VideoTableWithPayout videos={currentVideos} />
        </TabsContent>
        <TabsContent value="your" className="mt-0">
          <VideoTableWithPayout videos={currentVideos} showPayout />
        </TabsContent>
        <TabsContent value="team" className="mt-0">
          <VideoTableWithPayout videos={currentVideos} showPayout />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

// Extended Video Table with Payout column
function VideoTableWithPayout({ 
  videos, 
  showPayout = false 
}: { 
  videos: typeof extendedVideos; 
  showPayout?: boolean;
}) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const categoryColors: Record<string, string> = {
    "Cab Comparison": "bg-success/15 text-success",
    "Price Comparison": "bg-info/15 text-info",
    "Deals": "bg-warning/15 text-warning",
    "Awareness": "bg-destructive/15 text-destructive",
    "Education": "bg-success/15 text-success",
  };

  const statusColors: Record<string, string> = {
    paid: "bg-success/15 text-success",
    pending: "bg-warning/15 text-warning",
    processing: "bg-info/15 text-info",
  };

  if (videos.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border/50 text-center py-12">
        <PlayCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No videos found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or add new videos to track
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Video</th>
              <th>Category</th>
              <th>Views</th>
              <th>Growth</th>
              <th>Engagement</th>
              {showPayout && <th>Payout</th>}
              {showPayout && <th>Status</th>}
              <th>Posted</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.id} className="group cursor-pointer">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <div className="h-full w-full flex items-center justify-center">
                        <PlayCircle className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate max-w-[200px] group-hover:text-primary transition-colors">
                        {video.title}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {video.channel}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${categoryColors[video.category] || "bg-muted text-muted-foreground"}`}>
                    {video.category}
                  </span>
                </td>
                <td>
                  <span className="font-medium">{formatNumber(video.views)}</span>
                </td>
                <td>
                  <span className={`font-medium ${video.viewDelta > 0 ? "text-success" : "text-destructive"}`}>
                    {video.viewDelta > 0 ? "+" : ""}{video.viewDelta}%
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <span>{formatNumber(video.likes)} likes</span>
                    <span>•</span>
                    <span>{formatNumber(video.comments)} comments</span>
                  </div>
                </td>
                {showPayout && (
                  <td>
                    <span className="font-semibold text-foreground">
                      ₹{video.payout.toLocaleString()}
                    </span>
                  </td>
                )}
                {showPayout && (
                  <td>
                    <span className={`status-badge capitalize ${statusColors[video.status]}`}>
                      {video.status}
                    </span>
                  </td>
                )}
                <td>
                  <span className="text-muted-foreground">{video.postedAt}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
