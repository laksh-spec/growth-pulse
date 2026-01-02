// Mock data for the dashboard
// This will be replaced with real API data when backend is connected

export const mockKpiData = {
  totalViews: {
    value: "1.25M",
    trend: { value: 12.5, label: "vs last month" },
  },
  newInstalls: {
    value: "8,432",
    trend: { value: 8.2, label: "vs last month" },
  },
  extensionUsers: {
    value: "156K",
    trend: { value: -2.1, label: "vs last month" },
  },
  searchVolume: {
    value: "324K",
    trend: { value: 15.8, label: "vs last month" },
  },
};

export const mockPerformanceData = [
  { date: "Jan", views: 45000, installs: 1200, searches: 28000 },
  { date: "Feb", views: 52000, installs: 1450, searches: 32000 },
  { date: "Mar", views: 48000, installs: 1300, searches: 29000 },
  { date: "Apr", views: 61000, installs: 1680, searches: 38000 },
  { date: "May", views: 55000, installs: 1520, searches: 35000 },
  { date: "Jun", views: 72000, installs: 2100, searches: 45000 },
  { date: "Jul", views: 68000, installs: 1950, searches: 42000 },
  { date: "Aug", views: 85000, installs: 2400, searches: 52000 },
  { date: "Sep", views: 92000, installs: 2650, searches: 58000 },
  { date: "Oct", views: 88000, installs: 2500, searches: 55000 },
  { date: "Nov", views: 105000, installs: 3100, searches: 68000 },
  { date: "Dec", views: 125000, installs: 3800, searches: 82000 },
];

export const mockCategoryData = [
  { category: "Cab Comparison", value: 42500, color: "hsl(var(--chart-1))" },
  { category: "Price Comparison", value: 38200, color: "hsl(var(--chart-2))" },
  { category: "Deals", value: 28900, color: "hsl(var(--chart-3))" },
  { category: "Awareness", value: 18500, color: "hsl(var(--chart-4))" },
  { category: "Education", value: 12400, color: "hsl(var(--chart-5))" },
];

export const mockVideos = [
  {
    id: "1",
    title: "Uber vs Ola vs Rapido - Which is Cheapest in 2024?",
    channel: "Tech Burner",
    thumbnail: "",
    category: "Cab Comparison",
    views: 2450000,
    viewDelta: 28.5,
    likes: 98500,
    comments: 4200,
    postedAt: "Dec 28, 2024",
  },
  {
    id: "2",
    title: "How to Save 40% on Every Amazon Purchase",
    channel: "Trakin Tech",
    thumbnail: "",
    category: "Price Comparison",
    views: 1850000,
    viewDelta: 15.2,
    likes: 72000,
    comments: 3100,
    postedAt: "Dec 25, 2024",
  },
  {
    id: "3",
    title: "Best Flipkart Big Billion Days Deals 2024",
    channel: "Technical Guruji",
    thumbnail: "",
    category: "Deals",
    views: 980000,
    viewDelta: -4.5,
    likes: 45600,
    comments: 2800,
    postedAt: "Dec 20, 2024",
  },
  {
    id: "4",
    title: "Extension That Tracks Price History",
    channel: "Geeky Ranjit",
    thumbnail: "",
    category: "Awareness",
    views: 520000,
    viewDelta: 8.9,
    likes: 28900,
    comments: 1450,
    postedAt: "Dec 18, 2024",
  },
  {
    id: "5",
    title: "Complete Guide to Using Buyhatke",
    channel: "Tech With Tim",
    thumbnail: "",
    category: "Education",
    views: 345000,
    viewDelta: 22.1,
    likes: 18200,
    comments: 890,
    postedAt: "Dec 15, 2024",
  },
];

export const mockGaProperties = [
  { id: "GA4-001", name: "Buyhatke Ext Post Install 2", activeUsers: 156, newUsers: 42, sessions: 892 },
  { id: "GA4-002", name: "Buyhatke Extension New", activeUsers: 234, newUsers: 78, sessions: 1456 },
  { id: "GA4-003", name: "Buyhatke Goodies Landing", activeUsers: 23, newUsers: 8, sessions: 156 },
  { id: "GA4-004", name: "Buyhatke Price Tracker", activeUsers: 89, newUsers: 31, sessions: 542 },
  { id: "GA4-005", name: "Buyhatke Spend Lens", activeUsers: 45, newUsers: 12, sessions: 287 },
];

export const mockCorrelationData = [
  { date: "Week 1", videoViews: 125000, appInstalls: 3200, correlation: 0.85 },
  { date: "Week 2", videoViews: 142000, appInstalls: 3650, correlation: 0.88 },
  { date: "Week 3", videoViews: 118000, appInstalls: 2980, correlation: 0.82 },
  { date: "Week 4", videoViews: 165000, appInstalls: 4200, correlation: 0.91 },
];
