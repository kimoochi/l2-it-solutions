import Navbar from "../../components/Navbar";
import WhyUsSection from "../../components/WhyUsSection";
import Footer from "../../components/Footer";
import ChatbotWidget from "../../components/ChatbotWidget";

export default function WhyUsPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div className="pt-20">
        <WhyUsSection />
      </div>
      <Footer />
      <ChatbotWidget />
    </main>
  );
}
