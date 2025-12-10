import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Hero from "@/components/Hero";
import Hero2 from "@/components/Hero2";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-bg-color relative mx-auto flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <Hero />
        <Hero2 />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
