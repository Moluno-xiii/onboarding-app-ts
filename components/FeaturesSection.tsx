import CardsSection from "./CardsSection";
import GuideNote2 from "./GuideNote2";

export default function FeaturesSection() {
  return (
    <section className="font-tay-bea relative w-full overflow-hidden px-4 py-20 text-5xl leading-[0.9] sm:py-32 sm:text-6xl lg:text-8xl">
      <div className="container mx-auto">
        {/* -- TEXT HEADER SECTION -- */}

        <CardsSection />
      </div>
    </section>
  );
}
