import { PlayCircle, Eye, ThumbsUp, MessageCircle, TrendingUp } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

interface Video {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  category: string;
  views: number;
  viewDelta: number;
  likes: number;
  comments: number;
  postedAt: string;
}

interface VideoTableProps {
  videos: Video[];
  className?: string;
}

const categoryColors: Record<string, "success" | "warning" | "info" | "error"> = {
  "Cab Comparison": "success",
  "Price Comparison": "info",
  "Deals": "warning",
  "Awareness": "error",
  "Education": "success",
};

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function VideoTable({ videos, className }: VideoTableProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="data-table">
        <thead>
          <tr>
            <th>Video</th>
            <th>Category</th>
            <th>Views</th>
            <th>Growth</th>
            <th>Engagement</th>
            <th>Posted</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id} className="group cursor-pointer">
              <td>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <PlayCircle className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
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
                <StatusBadge
                  status={categoryColors[video.category] || "info"}
                  label={video.category}
                />
              </td>
              <td>
                <div className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{formatNumber(video.views)}</span>
                </div>
              </td>
              <td>
                <div
                  className={cn(
                    "flex items-center gap-1",
                    video.viewDelta > 0 ? "text-success" : "text-destructive"
                  )}
                >
                  <TrendingUp
                    className={cn("h-4 w-4", video.viewDelta < 0 && "rotate-180")}
                  />
                  <span className="font-medium">
                    {video.viewDelta > 0 ? "+" : ""}
                    {video.viewDelta}%
                  </span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{formatNumber(video.likes)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{formatNumber(video.comments)}</span>
                  </div>
                </div>
              </td>
              <td>
                <span className="text-muted-foreground">{video.postedAt}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
