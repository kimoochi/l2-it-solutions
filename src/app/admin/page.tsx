"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  LayoutDashboard,
  Package,
  ImageIcon,
  Users,
  MessageSquare,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  Upload,
  Eye,
  BarChart3,
  ShoppingBag,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  Mail,
  ChevronDown,
} from "lucide-react";
import {
  getProducts,
  saveProducts,
  getSlideshowImages,
  saveSlideshowImages,
  getAnalytics,
  getInquiries,
  generateId,
  type Product,
  type SlideshowImage,
  type AnalyticsData,
  type Inquiry,
} from "../../lib/store";

// ─── Types ──────────────────────────────────────────────────────────────────

type Tab = "analytics" | "products" | "slideshow";

type Toast = { id: string; message: string; type: "success" | "error" };

// ─── Toast Component ─────────────────────────────────────────────────────────

function ToastList({ toasts, remove }: { toasts: Toast[]; remove: (id: string) => void }) {
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-white font-semibold text-sm pointer-events-auto transition-all animate-fade-in-up ${
            t.type === "success" ? "bg-primary" : "bg-red-500"
          }`}
        >
          {t.type === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
          {t.message}
          <button onClick={() => remove(t.id)} className="ml-2 opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  sub,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  sub?: string;
}) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-border shadow-sm flex items-start gap-5 hover:shadow-lg transition-shadow">
      <div className={`p-4 rounded-2xl ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-text-muted text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-black text-secondary">{value}</p>
        {sub && <p className="text-xs text-text-muted mt-1">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Analytics Tab ───────────────────────────────────────────────────────────

function AnalyticsTab() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    setAnalytics(getAnalytics());
    setInquiries(getInquiries());
  }, []);

  if (!analytics) return null;

  // Last 7 days visit data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().split("T")[0];
    return {
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      visits: analytics.visitsByDay[key] || 0,
      inquiries: analytics.inquiriesByDay[key] || 0,
      key,
    };
  });

  const maxVisits = Math.max(...last7Days.map((d) => d.visits), 1);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-secondary mb-2">Dashboard Overview</h2>
        <p className="text-text-muted text-sm">All metrics are tracked locally in this browser.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          label="Total Site Visits"
          value={analytics.totalVisits.toLocaleString()}
          icon={Eye}
          color="bg-primary"
          sub="Tracked in this browser"
        />
        <StatCard
          label="Inquiries Received"
          value={analytics.totalInquiries.toLocaleString()}
          icon={Mail}
          color="bg-secondary"
          sub="Via contact form"
        />
        <StatCard
          label="Chat Sessions"
          value={analytics.totalChatSessions.toLocaleString()}
          icon={MessageSquare}
          color="bg-amber-500"
          sub="AI chatbot opens"
        />
        <StatCard
          label="Products Listed"
          value={getProducts().length || "Default"}
          icon={ShoppingBag}
          color="bg-indigo-500"
          sub="Manage in Products tab"
        />
      </div>

      {/* Visit Chart */}
      <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-black text-secondary">Visit Trend</h3>
            <p className="text-xs text-text-muted mt-1">Last 7 days</p>
          </div>
          <BarChart3 className="h-5 w-5 text-text-muted" />
        </div>
        <div className="flex items-end gap-3 h-40">
          {last7Days.map((day) => (
            <div key={day.key} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full relative flex-1 flex items-end">
                <div
                  className="w-full bg-primary/20 rounded-t-lg hover:bg-primary/40 transition-colors relative group cursor-default"
                  style={{ height: `${Math.max((day.visits / maxVisits) * 100, 4)}%` }}
                >
                  {day.visits > 0 && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {day.visits}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[10px] font-bold text-text-muted uppercase">{day.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black text-secondary">Recent Inquiries</h3>
          <span className="bg-primary/10 text-primary text-xs font-black px-3 py-1 rounded-full">
            {inquiries.length} total
          </span>
        </div>
        {inquiries.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            <Mail className="mx-auto h-10 w-10 opacity-20 mb-3" />
            <p className="text-sm font-medium">No inquiries yet.</p>
            <p className="text-xs mt-1">They'll appear here when visitors submit the contact form.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.slice(0, 8).map((inq) => (
              <div
                key={inq.id}
                className="flex items-start gap-4 p-4 rounded-2xl bg-page-bg border border-border hover:border-primary/20 transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded-xl text-primary shrink-0">
                  <Users className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="font-bold text-secondary text-sm truncate">{inq.name}</p>
                    <span className="text-[10px] text-text-muted flex items-center gap-1 shrink-0">
                      <Clock className="h-3 w-3" />
                      {new Date(inq.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-primary font-semibold">{inq.email}</p>
                  <p className="text-xs text-text-muted mt-1 line-clamp-1">{inq.reason} — {inq.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Products Tab ─────────────────────────────────────────────────────────────

const EMPTY_PRODUCT: Omit<Product, "id"> = {
  name: "",
  category: "",
  description: "",
  price: "",
  image: "",
};

function ProductsTab({ toast }: { toast: (msg: string, type?: "success" | "error") => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const persist = (updated: Product[]) => {
    setProducts(updated);
    saveProducts(updated);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((f) => ({ ...f, image: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast("Product name is required.", "error");
      return;
    }
    if (editingId) {
      const updated = products.map((p) =>
        p.id === editingId ? { ...form, id: editingId } : p
      );
      persist(updated);
      toast("Product updated!");
    } else {
      persist([...products, { ...form, id: generateId() }]);
      toast("Product added!");
    }
    setForm(EMPTY_PRODUCT);
    setShowForm(false);
    setEditingId(null);
  };

  const startEdit = (p: Product) => {
    setForm({ name: p.name, category: p.category, description: p.description, price: p.price, image: p.image });
    setEditingId(p.id);
    setShowForm(true);
  };

  const deleteProduct = (id: string) => {
    persist(products.filter((p) => p.id !== id));
    toast("Product deleted.");
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_PRODUCT);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-secondary">Products</h2>
          <p className="text-text-muted text-sm mt-1">
            {products.length} product{products.length !== 1 ? "s" : ""} listed. Changes show live on the <span className="text-primary font-semibold">/products</span> page.
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-2xl font-black text-sm hover:bg-secondary transition-all shadow-lg shadow-primary/20 active:scale-95"
          >
            <Plus className="h-4 w-4" /> Add Product
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-primary/20 p-8 shadow-lg space-y-5"
        >
          <h3 className="text-lg font-black text-secondary">
            {editingId ? "Edit Product" : "New Product"}
          </h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-secondary uppercase tracking-widest">Product Name *</label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full bg-page-bg border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. Hikvision DS-2CD2143G2"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-secondary uppercase tracking-widest">Category</label>
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full appearance-none bg-page-bg border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary pr-10 cursor-pointer"
                >
                  <option value="">— Select a category —</option>
                  <option value="CCTV System Installation">CCTV System Installation</option>
                  <option value="Networking & WiFi Mesh">Networking &amp; WiFi Mesh</option>
                  <option value="Structured Cabling">Structured Cabling</option>
                  <option value="Maintenance & Repair">Maintenance &amp; Repair</option>
                  <option value="Other / General">Other / General</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              </div>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-widest">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                className="w-full bg-page-bg border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Short product description..."
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-secondary uppercase tracking-widest">Price</label>
              <input
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="w-full bg-page-bg border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. ₱4,500 or Contact for Quote"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-secondary uppercase tracking-widest">Image URL</label>
              <input
                value={form.image.startsWith("data:") ? "" : form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                className="w-full bg-page-bg border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
                — or upload an image from your computer
              </label>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 border border-dashed border-border bg-page-bg text-secondary px-4 py-3 rounded-xl text-sm font-semibold hover:border-primary transition-colors"
              >
                <Upload className="h-4 w-4" /> Upload Image
              </button>
              {form.image && (
                <img src={form.image} alt="preview" className="mt-3 h-24 w-40 object-cover rounded-xl border border-border" />
              )}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-secondary transition-all active:scale-95"
            >
              <Save className="h-4 w-4" /> {editingId ? "Save Changes" : "Add Product"}
            </button>
            <button
              type="button"
              onClick={cancelForm}
              className="flex items-center gap-2 bg-page-bg text-secondary border border-border px-6 py-3 rounded-2xl font-black text-sm hover:border-secondary transition-all"
            >
              <X className="h-4 w-4" /> Cancel
            </button>
          </div>
        </form>
      )}

      {/* Product Grid */}
      {products.length === 0 && !showForm ? (
        <div className="text-center py-20 text-text-muted bg-white rounded-3xl border border-border">
          <Package className="mx-auto h-14 w-14 opacity-20 mb-4" />
          <p className="font-bold">No products yet.</p>
          <p className="text-sm mt-1">Click "Add Product" to get started.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-40 bg-page-bg overflow-hidden">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted">
                    <Package className="h-10 w-10 opacity-20" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{product.category}</span>
                <h4 className="font-black text-secondary text-base mt-1 truncate">{product.name}</h4>
                <p className="text-text-muted text-xs mt-1 line-clamp-2 mb-3">{product.description}</p>
                {product.price && <p className="text-primary font-black">{product.price}</p>}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => startEdit(product)}
                    className="flex-1 flex items-center justify-center gap-1 bg-page-bg border border-border text-secondary text-xs font-bold px-3 py-2 rounded-xl hover:border-primary hover:text-primary transition-all"
                  >
                    <Edit3 className="h-3 w-3" /> Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="flex items-center justify-center gap-1 bg-red-50 border border-red-100 text-red-500 text-xs font-bold px-3 py-2 rounded-xl hover:bg-red-100 transition-all"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Slideshow Tab ────────────────────────────────────────────────────────────

function SlideshowTab({ toast }: { toast: (msg: string, type?: "success" | "error") => void }) {
  const [images, setImages] = useState<SlideshowImage[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [altInput, setAltInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImages(getSlideshowImages());
  }, []);

  const persist = (updated: SlideshowImage[]) => {
    setImages(updated);
    saveSlideshowImages(updated);
  };

  const addUrl = () => {
    if (!urlInput.trim()) {
      toast("Please enter an image URL.", "error");
      return;
    }
    persist([...images, { id: generateId(), src: urlInput.trim(), alt: altInput.trim() || "Slideshow image" }]);
    setUrlInput("");
    setAltInput("");
    toast("Image added to slideshow!");
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    let counter = 0;
    const newImages: SlideshowImage[] = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        newImages.push({ id: generateId(), src: ev.target?.result as string, alt: file.name.replace(/\.[^.]+$/, "") });
        counter++;
        if (counter === files.length) {
          persist([...images, ...newImages]);
          toast(`${files.length} image${files.length > 1 ? "s" : ""} added!`);
        }
      };
      reader.readAsDataURL(file);
    });
    if (fileRef.current) fileRef.current.value = "";
  };

  const remove = (id: string) => {
    persist(images.filter((img) => img.id !== id));
    toast("Image removed.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-secondary">Hero Slideshow</h2>
        <p className="text-text-muted text-sm mt-1">
          Manage images shown in the homepage hero slideshow. If empty, default images are used.
        </p>
      </div>

      {/* Add Image Form */}
      <div className="bg-white rounded-3xl border border-border p-8 shadow-sm space-y-5">
        <h3 className="font-black text-secondary">Add Images</h3>

        {/* File Upload */}
        <div>
          <label className="text-xs font-bold text-secondary uppercase tracking-widest block mb-2">Upload from computer</label>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFile} />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 border-2 border-dashed border-primary/30 hover:border-primary bg-primary/5 text-primary px-6 py-4 rounded-2xl text-sm font-bold transition-colors w-full justify-center"
          >
            <Upload className="h-5 w-5" /> Click to upload (multiple images supported)
          </button>
        </div>

        <div className="relative flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs font-bold text-text-muted uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* URL Input */}
        <div>
          <label className="text-xs font-bold text-secondary uppercase tracking-widest block mb-2">Paste image URL</label>
          <div className="flex gap-3">
            <input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 bg-page-bg border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              onKeyDown={(e) => e.key === "Enter" && addUrl()}
            />
            <input
              value={altInput}
              onChange={(e) => setAltInput(e.target.value)}
              placeholder="Caption (optional)"
              className="w-40 bg-page-bg border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              onKeyDown={(e) => e.key === "Enter" && addUrl()}
            />
            <button
              onClick={addUrl}
              className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-black text-sm hover:bg-secondary transition-all active:scale-95"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
        </div>
      </div>

      {/* Image Grid */}
      {images.length === 0 ? (
        <div className="text-center py-16 text-text-muted bg-white rounded-3xl border border-border">
          <ImageIcon className="mx-auto h-12 w-12 opacity-20 mb-3" />
          <p className="font-bold">No custom images yet.</p>
          <p className="text-sm mt-1">Add images above. Until then, default images are shown on the homepage.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {images.map((img, idx) => (
            <div key={img.id} className="relative rounded-3xl overflow-hidden border border-border shadow-sm group bg-white">
              <div className="h-48">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="min-w-0">
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">Slide {idx + 1}</span>
                  <p className="text-sm font-semibold text-secondary truncate">{img.alt}</p>
                </div>
                <button
                  onClick={() => remove(img.id)}
                  className="ml-3 bg-red-50 border border-red-100 text-red-500 p-2 rounded-xl hover:bg-red-100 transition-all shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("analytics");
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: "success" | "error" = "success") => {
    const id = generateId();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "analytics", label: "Analytics", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "slideshow", label: "Slideshow", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-page-bg">
      <ToastList toasts={toasts} remove={removeToast} />

      {/* Header */}
      <header className="bg-secondary text-white px-6 py-5 sticky top-0 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary p-2.5 rounded-2xl">
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-black text-lg leading-none">L2 IT Admin</h1>
              <p className="text-white/50 text-xs mt-0.5">Management Portal</p>
            </div>
          </div>
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors border border-white/10"
          >
            View Site <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-0">
        {/* Sidebar */}
        <aside className="lg:w-56 shrink-0 bg-white border-r border-border lg:min-h-screen p-4">
          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible py-2 lg:py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap w-full ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-text-muted hover:bg-page-bg hover:text-secondary"
                }`}
              >
                <tab.icon className="h-4 w-4 shrink-0" />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-10 min-w-0">
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "products" && <ProductsTab toast={addToast} />}
          {activeTab === "slideshow" && <SlideshowTab toast={addToast} />}
        </main>
      </div>
    </div>
  );
}
