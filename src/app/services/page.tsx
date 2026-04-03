import Navbar from "../../components/Navbar";
import ServicesSection from "../../components/ServicesSection";
import Footer from "../../components/Footer";
import ChatbotWidget from "../../components/ChatbotWidget";

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="pt-20">
        <ServicesSection />
      </div>
      <Footer />
      <ChatbotWidget />
    </main>
  );
}
