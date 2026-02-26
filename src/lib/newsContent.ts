export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
};

export type NewsContent = {
  featured: NewsItem;
  latest: NewsItem[];
  press: string[];
};

const STORAGE_KEY = "news-content-v1";

export const defaultNewsContent: NewsContent = {
  featured: {
    id: "featured-1",
    title: "Five Star Group Expands Sustainable Packaging Capacity Across North America",
    excerpt:
      "The expansion adds new converting lines, improved recovery systems, and advanced quality controls to support lower-impact packaging programs.",
    date: "February 2026",
    category: "Featured",
  },
  latest: [
    {
      id: "latest-1",
      title: "New Recyclable Film Program Launches for Food Brands",
      excerpt:
        "A new mono-material flexible packaging line designed for stronger shelf appeal and easier recycling.",
      date: "January 2026",
      category: "Product News",
    },
    {
      id: "latest-2",
      title: "Corrugated Division Opens Additional Regional Fulfillment Hub",
      excerpt:
        "Expanded capacity improves lead times and strengthens distribution coverage for high-volume customers.",
      date: "December 2025",
      category: "Operations",
    },
    {
      id: "latest-3",
      title: "Group-Level Energy Program Reduces Site Consumption",
      excerpt:
        "Cross-division optimization initiatives continue to lower energy intensity across manufacturing operations.",
      date: "November 2025",
      category: "Sustainability",
    },
  ],
  press: [
    "Five Star Group Announces 2026 Sustainability Milestones",
    "Radiant Flexo Introduces Next-Generation Barrier Structures",
    "Industry Plastic Expands Reusable Transport Packaging Portfolio",
    "Stellar Board Adds Enhanced Print Finishing Capability",
  ],
};

export const getNewsContent = (): NewsContent => {
  if (typeof window === "undefined") return defaultNewsContent;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultNewsContent;

  try {
    const parsed = JSON.parse(raw) as NewsContent;
    if (!parsed?.featured || !Array.isArray(parsed.latest) || !Array.isArray(parsed.press)) {
      return defaultNewsContent;
    }

    return parsed;
  } catch {
    return defaultNewsContent;
  }
};

export const saveNewsContent = (content: NewsContent) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
};

export const resetNewsContent = () => {
  saveNewsContent(defaultNewsContent);
};

export const createId = (prefix: string) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
