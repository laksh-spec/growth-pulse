import { useState } from "react";
import { PlayCircle, ChevronRight, Plus, Filter, Search } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { VideoTable } from "@/components/dashboard/VideoTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockVideos } from "@/data/mockData";

const categories = ["All Categories", "Cab Comparison", "Price Comparison", "Deals", "Awareness", "Education"];

export default function Videos() {
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = mockVideos.filter((video) => {
    const matchesCategory = categoryFilter === "All Categories" || video.category === categoryFilter;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[200px]">
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

      {/* Video Table */}
      <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
        <VideoTable videos={filteredVideos} />
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <PlayCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No videos found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or add new videos to track
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
