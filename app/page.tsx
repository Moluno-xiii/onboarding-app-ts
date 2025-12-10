import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import Hero2 from "@/components/Hero2";
import ContactSection from "@/components/ContactSection";
import FeaturesSection from "@/components/FeaturesSection";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-bg-color relative mx-auto flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <Hero />
        <Hero2 />
        <FeaturesSection />
      </main>
      <ContactSection />
    </div>
  );
};

export default LandingPage;
