import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Hero from "@/components/Hero";
import Hero2 from "@/components/Hero2";
import Image from "next/image";
import ContactSection from "@/components/ContactSection";
import PartnerSection from "@/components/PartnerSectionHeader";
import CardsSection from "@/components/CardsSection";

const cardClass =
  "flex flex-1 flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-bg-color relative mx-auto flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />

      <main className="bg-yellow flex-1">
        <Hero />
        <Hero2 />
        <CardsSection />
      </main>

      <ContactSection />
    </div>
  );
};

export default LandingPage;
