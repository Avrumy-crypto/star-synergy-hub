import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DivisionGrid from "@/components/DivisionGrid";
import SynergySection from "@/components/SynergySection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <HeroSection />
      <DivisionGrid />
      <StatsSection />
      <SynergySection />
      <CTASection />
    </main>
    <Footer />
  </div>
);

export default Index;
