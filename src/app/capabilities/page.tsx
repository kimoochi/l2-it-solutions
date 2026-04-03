import Navbar from "../../components/Navbar";
import CapabilitiesSection from "../../components/CapabilitiesSection";
import Footer from "../../components/Footer";
import ChatbotWidget from "../../components/ChatbotWidget";

export default function CapabilitiesPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="pt-20">
        <CapabilitiesSection />
      </div>
      <Footer />
      <ChatbotWidget />
    </main>
  );
}
