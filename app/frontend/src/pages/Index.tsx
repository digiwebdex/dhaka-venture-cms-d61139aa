import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import UmrahOfferSection from "@/components/home/UmrahOfferSection";
import FlightOfferSection from "@/components/home/FlightOfferSection";
import PackagesSection from "@/components/home/PackagesSection";
import VisaSection from "@/components/home/VisaSection";
import ContactCTA from "@/components/home/ContactCTA";

const Index = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <UmrahOfferSection />
      <FlightOfferSection />
      <PackagesSection />
      <VisaSection />
      <ContactCTA />
    </div>
  );
};

export default Index;
