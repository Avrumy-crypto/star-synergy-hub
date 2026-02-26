import Header from "@/components/Header";
import HeroSection from "@/pages/HeroSection";
import DivisionGrid from "@/components/DivisionGrid";
import SustainabilityVisualSection from "@/components/SustainabilityVisualSection";
import RDSection from "@/components/RDSection";
import SynergySection from "@/components/SynergySection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <HeroSection />
      <DivisionGrid />
      <SustainabilityVisualSection />
      <StatsSection />
      <RDSection />
      <SynergySection />
    </main>
    <Footer />
  </div>
);

export default Index;
