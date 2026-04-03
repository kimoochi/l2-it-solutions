"use client";

import { useState, useEffect } from "react";
import { Camera, Wifi, Settings, ShieldAlert, ArrowRight, Package } from "lucide-react";
import { getProducts, type Product } from "../lib/store";

const DEFAULT_PRODUCTS = [
  {
    id: "default-1",
    category: "CCTV Cameras",
    name: "HD Smart Security",
    description: "4K Resolution, night vision, and motion tracking for 24/7 security.",
    price: "",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "default-2",
    category: "Networking",
    name: "Ubiquiti WiFi Systems",
    description: "Enterprise-grade mesh WiFi 6 for flawless whole-building coverage.",
    price: "",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "default-3",
    category: "Computing",
    name: "Server Infrastructure",
    description: "Rack-mounted servers and storage for business data management.",
    price: "",
    image: "https://images.unsplash.com/photo-1558494949-ef01095bf810?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "default-4",
    category: "Access Control",
    name: "Biometrics & RFID",
    description: "Secure door entry systems with biometric and RFID authentication.",
    price: "",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=600",
  },
];

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const saved = getProducts();
    setProducts(saved.length > 0 ? saved : DEFAULT_PRODUCTS);
  }, []);

  return (
    <section id="products" className="py-24 bg-page-bg scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-primary font-bold text-sm tracking-widest uppercase mb-3">Our Hardware</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-secondary tracking-tight">
              Premium <span className="text-primary">Equipment</span> Trusted by Experts
            </h1>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 text-text-muted">
            <Package className="mx-auto h-16 w-16 opacity-20 mb-4" />
            <p className="text-lg font-medium">No products listed yet.</p>
            <p className="text-sm mt-2">Add products from the <span className="text-primary font-bold">/admin</span> portal.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-md border border-border hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-48 overflow-hidden bg-page-bg">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted">
                      <Package className="h-12 w-12 opacity-30" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-2 inline-block">
                    {product.category}
                  </span>
                  <h4 className="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>
                  {product.price && (
                    <p className="text-primary font-black text-lg">
                      {product.price}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
