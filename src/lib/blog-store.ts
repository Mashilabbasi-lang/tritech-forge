export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  published: boolean;
  coverColor: string;
  imageUrl?: string;
}

const BASE = import.meta.env.VITE_CRM_API_URL || "http://localhost:3001";
const BLOG_PASSWORD = import.meta.env.VITE_BLOG_PASSWORD || "TriTech1122@$%";

async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-blog-password": BLOG_PASSWORD,
      ...(options.headers || {}),
    },
  });
  return res.json();
}

export async function getPublishedPostsAsync(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${BASE}/api/blog`);
    const data = await res.json();
    return data.success ? data.posts : [];
  } catch {
    return [];
  }
}

export async function getPostBySlugAsync(slug: string): Promise<BlogPost | undefined> {
  try {
    const res = await fetch(`${BASE}/api/blog/${slug}`);
    const data = await res.json();
    return data.success ? data.post : undefined;
  } catch {
    return undefined;
  }
}

export async function getAllPostsAsync(): Promise<BlogPost[]> {
  try {
    const data = await apiFetch("/api/blog/all");
    return data.success ? data.posts : [];
  } catch {
    return [];
  }
}

export async function savePostAsync(post: BlogPost): Promise<BlogPost | null> {
  try {
    const allPosts = await getAllPostsAsync();
    const exists = allPosts.find(p => p.id === post.id);
    if (exists) {
      const data = await apiFetch(`/api/blog/${post.id}`, { method: "PUT", body: JSON.stringify(post) });
      return data.success ? data.post : null;
    } else {
      const data = await apiFetch("/api/blog", { method: "POST", body: JSON.stringify(post) });
      return data.success ? data.post : null;
    }
  } catch {
    return null;
  }
}

export async function deletePostAsync(id: string): Promise<boolean> {
  try {
    const data = await apiFetch(`/api/blog/${id}`, { method: "DELETE" });
    return data.success;
  } catch {
    return false;
  }
}

export function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

export function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export const CATEGORIES = [
  "Case Studies", "Business Growth", "ROI & Savings",
  "AI Technology", "Industry Insights", "How-To Guides", "Product Updates",
];

export const COVER_COLORS = [
  "from-blue-600 to-indigo-800", "from-purple-600 to-pink-700",
  "from-cyan-600 to-blue-700", "from-violet-600 to-purple-800",
  "from-indigo-600 to-blue-900", "from-fuchsia-600 to-purple-800",
];
