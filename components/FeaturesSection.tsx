import CardsSection from "./CardsSection";
import { YellowSquiggle } from "./Shapes";

export default function FeaturesSection() {
  return (
    <section className="font-tay-bea relative w-full overflow-hidden px-4 py-20 text-5xl leading-[0.9] sm:py-32 sm:text-6xl lg:text-8xl">
      <div className="container mx-auto">
        {/* -- TEXT HEADER SECTION -- */}
        <div className="text-text relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center text-center">
          {/* Top Row */}
          <div className="relative mb-4 flex w-full flex-col items-center justify-center sm:flex-row">
            {/* "WE LOVE" */}
            <div className="relative">
              <h2 className="-translate-x-4 -rotate-6 transform md:-rotate-10">
                Guide users
              </h2>
              <div className="absolute -bottom-4 left-3/4 -z-10 h-8 w-24 -translate-x-1/2 -rotate-3 md:h-10 md:w-32">
                <YellowSquiggle className="h-full w-full" />
              </div>
            </div>

            {/* Floating Triangle Top Right */}
            <div className="absolute -top-12 -right-4 -z-10 h-24 w-24 rotate-12 sm:-top-10 sm:left-[70%] md:left-[80%] md:h-32 md:w-32">
              <img src="/yellow-chip.gif" alt="Connect illustration" />
            </div>
          </div>

          {/* Third Row */}
          <div className="relative mt-2 flex w-full flex-col items-center justify-center sm:flex-row sm:space-x-8">
            <div className="relative flex flex-row items-center">
              <h2 className="translate-x-2 -rotate-2 transform">through</h2>
              <div className="absolute -top-3/5 -left-1/2 -z-10 h-8 w-24 translate-x-1/4 md:-top-6 md:h-10 md:w-32 lg:top-0 lg:translate-x-1/3">
                <img
                  src="/red-polygon.gif"
                  alt="Connect illustration"
                  className="h-20 w-20 md:size-32"
                />
              </div>
            </div>
          </div>

          {/* Fourth Row */}
          <div className="relative z-10 mt-4 w-full text-center">
            <h2 className="-rotate-1 transform">step by step.</h2>

            {/* Triangle Bottom Left */}
            <div className="absolute top-1/2 left-4 -z-10 h-16 w-16 rotate-145 sm:top-0 sm:left-20 md:h-20 md:w-20 lg:h-36 lg:w-36">
              <img src="/yellow-chip.gif" alt="Connect illustration" />
            </div>

            {/* Triangle Bottom Right */}
            <div className="absolute top-full right-4 h-24 w-26 rotate-82 sm:top-4 sm:right-4 md:h-20 md:w-20 lg:h-36 lg:w-36">
              <img src="/yellow-chip.gif" alt="Connect illustration" />
            </div>
          </div>
        </div>
        <CardsSection />
      </div>
    </section>
  );
}
