/**
 * localStorage-based data store for L2 IT Admin Portal.
 * No database required — data persists in the browser.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string; // URL or base64
}

export interface SlideshowImage {
  id: string;
  src: string; // URL or base64
  alt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  reason: string;
  message: string;
  date: string; // ISO string
}

export interface AnalyticsData {
  totalVisits: number;
  totalInquiries: number;
  totalChatSessions: number;
  visitsByDay: Record<string, number>; // e.g. "2026-04-03": 5
  inquiriesByDay: Record<string, number>;
  lastUpdated: string;
}

// ─── Keys ─────────────────────────────────────────────────────────────────────

const PRODUCTS_KEY = "l2_admin_products";
const SLIDESHOW_KEY = "l2_admin_slideshow";
const INQUIRIES_KEY = "l2_admin_inquiries";
const ANALYTICS_KEY = "l2_admin_analytics";

// ─── Products ─────────────────────────────────────────────────────────────────

export function getProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveProducts(products: Product[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

// ─── Slideshow ─────────────────────────────────────────────────────────────────

export function getSlideshowImages(): SlideshowImage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SLIDESHOW_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSlideshowImages(images: SlideshowImage[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SLIDESHOW_KEY, JSON.stringify(images));
}

// ─── Inquiries ────────────────────────────────────────────────────────────────

export function getInquiries(): Inquiry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveInquiry(inquiry: Omit<Inquiry, "id" | "date">): void {
  if (typeof window === "undefined") return;
  const existing = getInquiries();
  const newInquiry: Inquiry = {
    ...inquiry,
    id: generateId(),
    date: new Date().toISOString(),
  };
  existing.unshift(newInquiry);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(existing));

  // Update analytics
  const analytics = getAnalytics();
  analytics.totalInquiries += 1;
  const today = new Date().toISOString().split("T")[0];
  analytics.inquiriesByDay[today] = (analytics.inquiriesByDay[today] || 0) + 1;
  analytics.lastUpdated = new Date().toISOString();
  saveAnalytics(analytics);
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export function getAnalytics(): AnalyticsData {
  if (typeof window === "undefined") {
    return {
      totalVisits: 0,
      totalInquiries: 0,
      totalChatSessions: 0,
      visitsByDay: {},
      inquiriesByDay: {},
      lastUpdated: new Date().toISOString(),
    };
  }
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fall through
  }
  return {
    totalVisits: 0,
    totalInquiries: 0,
    totalChatSessions: 0,
    visitsByDay: {},
    inquiriesByDay: {},
    lastUpdated: new Date().toISOString(),
  };
}

export function saveAnalytics(data: AnalyticsData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
}

export function trackVisit(): void {
  if (typeof window === "undefined") return;
  const analytics = getAnalytics();
  analytics.totalVisits += 1;
  const today = new Date().toISOString().split("T")[0];
  analytics.visitsByDay[today] = (analytics.visitsByDay[today] || 0) + 1;
  analytics.lastUpdated = new Date().toISOString();
  saveAnalytics(analytics);
}

export function trackChatSession(): void {
  if (typeof window === "undefined") return;
  const analytics = getAnalytics();
  analytics.totalChatSessions += 1;
  analytics.lastUpdated = new Date().toISOString();
  saveAnalytics(analytics);
}

// ─── Utilities ────────────────────────────────────────────────────────────────

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
