import Image from "next/image";

export default function HowItWorksSection() {
  const features = [
    {
      id: "01",
      title: "Install Onboardify",
      description:
        "Add a tiny script or SDK and your product is ready for guided flows.",
      icon: "/diamond.webp",
      rotation: "rotate-1 sm:rotate-0 md:-rotate-1",
    },
    {
      id: "02",
      title: "Create guided steps",
      description:
        "Create step-by-step tours and tooltips with a dashboard — highlight flows, add actions, and publish instantly.",
      icon: "/flower.webp",
      rotation: "-rotate-1 sm:rotate-0 md:-rotate-1",
    },
    {
      id: "03",
      title: "Show users the way",
      description:
        "Deliver in-product guidance that feels native and helps users succeed faster.",
      icon: "/book.webp",
      rotation: "rotate-2 sm:rotate-0 md:rotate-2",
    },
    {
      id: "04",
      title: "Measure and optimize",
      description:
        "Track completion, drop-off, and engagement so you can refine onboarding.",
      icon: "/light-bulb.webp",
      rotation: "-rotate-1 sm:rotate-0 md:-rotate-1",
    },
  ];

  return (
    <section className="bg-text relative w-full overflow-x-hidden rounded-[3rem] px-6 py-24">
      {/* -- HEADER -- */}
      <div className="relative mx-auto mb-12 max-w-6xl text-center">
        <span className="font-raleway mb-4 block text-sm font-bold tracking-widest text-gray-400 uppercase">
          How It Works
        </span>

        <div className="text-white">
          <div className="relative z-10">
            <div className="font-tay-bea text-5xl leading-[0.9] uppercase sm:text-6xl lg:text-8xl">
              <div className="flex items-center justify-center">
                <Image
                  src="/red-star.gif"
                  alt=""
                  className="h-18 w-18 sm:size-32"
                  width={50}
                  height={50}
                  unoptimized
                />

                <h2 className="rotate-2">Guidance</h2>
                <Image
                  src="/purple-triangles.gif"
                  alt=""
                  className="h-18 w-18 sm:size-32"
                  width={50}
                  height={50}
                  unoptimized
                />
              </div>
              <h2 className="-rotate-2"> that works</h2>
            </div>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-300 sm:text-xl">
            Guide users through key flows with interactive tours, tooltips, and
            analytics — all built to increase activation and retention.
          </p>
        </div>
      </div>

      {/* -- CARDS GRID -- */}
      <div className="container mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`group bg-card text-text relative flex flex-col items-center justify-between rounded-4xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl ${feature.rotation} min-h-[360px]`}
          >
            {/* Number */}
            <div className="mb-4">
              <span className="font-sans text-xs font-bold tracking-[0.2em] opacity-60">
                {feature.id}
              </span>
            </div>

            {/* Title */}
            <div className="mb-6">
              <h3 className="font-tay-bea text-2xl leading-none tracking-wide md:text-3xl">
                <span className="block">{feature.title}</span>
              </h3>
            </div>

            {/* Icon (your gifs/webp) */}
            <div className="mb-8 flex h-24 w-24 items-center justify-center sm:h-32 sm:w-32">
              <Image
                src={feature.icon}
                alt={`${feature.title} illustration`}
                className="h-full w-full object-contain"
                width={50}
                height={50}
                unoptimized
              />
            </div>

            {/* Description */}
            <div className="mt-auto max-w-[260px]">
              <p className="font-sans text-sm leading-relaxed font-medium text-gray-800">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
