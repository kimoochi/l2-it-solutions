import Navbar from "../../components/Navbar";
import ContactSection from "../../components/ContactSection";
import Footer from "../../components/Footer";
import ChatbotWidget from "../../components/ChatbotWidget";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="pt-20">
        <ContactSection />
      </div>
      <Footer />
      <ChatbotWidget />
    </main>
  );
}
