import { Aboutajo } from "@/components/landingpage/Aboutajo";
import { FinalCTA } from "@/components/landingpage/Cta";
import { DashboardPreview } from "@/components/landingpage/DashboardPreview";
import { FAQSection } from "@/components/landingpage/Faq";
import Hero from "@/components/landingpage/Hero";
import { HowItWorks } from "@/components/landingpage/How-it-works";
import { InfrastructureFlow } from "@/components/landingpage/Poweredby";
import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero/>
      <Aboutajo/>
      <HowItWorks/>
      <DashboardPreview/>
      <FAQSection/>
      <FinalCTA/>
      <InfrastructureFlow/>
      <Footer/>
      
    </div>
  );
}
