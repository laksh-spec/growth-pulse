import { TrendingUp, ChevronRight, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { mockCorrelationData } from "@/data/mockData";

const correlationInsights = [
  {
    category: "Cab Comparison",
    correlation: 0.92,
    lift: "+28%",
    insight: "Strong positive correlation with app installs",
    direction: "up",
  },
  {
    category: "Price Comparison",
    correlation: 0.85,
    lift: "+22%",
    insight: "High correlation with extension installs",
    direction: "up",
  },
  {
    category: "Deals",
    correlation: 0.78,
    lift: "+15%",
    insight: "Moderate correlation with search volume",
    direction: "up",
  },
  {
    category: "Awareness",
    correlation: 0.65,
    lift: "+8%",
    insight: "Lower but consistent brand lift",
    direction: "up",
  },
  {
    category: "Education",
    correlation: 0.72,
    lift: "+12%",
    insight: "Drives long-term engagement",
    direction: "up",
  },
];

const correlationChartData = [
  { videoViews: 50000, installs: 1200, category: "Education" },
  { videoViews: 85000, installs: 2100, category: "Awareness" },
  { videoViews: 120000, installs: 3200, category: "Deals" },
  { videoViews: 180000, installs: 4800, category: "Price Comparison" },
  { videoViews: 245000, installs: 6500, category: "Cab Comparison" },
];

export default function Correlations() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <TrendingUp className="h-4 w-4" />
          <span>Intelligence</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Correlations</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Correlation Analysis</h1>
        <p className="text-muted-foreground">
          Discover how video performance correlates with product metrics
        </p>
      </div>

      {/* Correlation Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard
          title="Views vs Installs Over Time"
          subtitle="Weekly correlation trends"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockCorrelationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="videoViews"
                name="Video Views"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="appInstalls"
                name="App Installs"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-2))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Scatter: Views vs Installs"
          subtitle="By content category"
        >
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis
                dataKey="videoViews"
                name="Video Views"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
              />
              <YAxis
                dataKey="installs"
                name="Installs"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <ZAxis range={[100, 400]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                cursor={{ strokeDasharray: "3 3" }}
              />
              <Scatter
                name="Categories"
                data={correlationChartData}
                fill="hsl(var(--chart-1))"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Correlation Insights Table */}
      <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Correlation Insights</h3>
          <p className="text-sm text-muted-foreground">
            How each category correlates with product metrics
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Correlation Score</th>
                <th>Lift</th>
                <th>Insight</th>
              </tr>
            </thead>
            <tbody>
              {correlationInsights.map((insight) => (
                <tr key={insight.category}>
                  <td className="font-medium">{insight.category}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${insight.correlation * 100}px` }}
                      />
                      <span className="text-sm font-medium">
                        {insight.correlation.toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-success">
                      {insight.direction === "up" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      <span className="font-medium">{insight.lift}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{insight.insight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
