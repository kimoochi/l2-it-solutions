import Navbar from "../../components/Navbar";
import ProductsSection from "../../components/ProductsSection";
import Footer from "../../components/Footer";
import ChatbotWidget from "../../components/ChatbotWidget";

export default function ProductsPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="pt-20">
        <ProductsSection />
      </div>
      <Footer />
      <ChatbotWidget />
    </main>
  );
}
