import Link from "next/link";

import { features, steps } from "@/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IoMdPlay } from "react-icons/io";



const LandingPage: React.FC = () => {
  return (
    <div className="group/design-root relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="@container px-6 pt-10">
          <div
            className="relative flex min-h-[400px] flex-col items-center justify-center gap-6 overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat p-6 @[480px]:gap-8"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop")',
            }}
          >
            <div className="bg-primary/20 absolute inset-0 mix-blend-overlay"></div>
            <div className="z-10 flex flex-col gap-2 text-center">
              <h1 className="text-4xl leading-tight font-black tracking-[-0.033em] text-white @[480px]:text-5xl">
                Effortless User Onboarding
              </h1>
              <h2 className="mx-auto max-w-md text-sm leading-normal font-normal text-white/90 @[480px]:text-base">
                Guide your users with interactive tours and tooltips, embedded
                in minutes.
              </h2>
            </div>
            <Link
              href="/"
              className="text-primary z-10 flex h-10 max-w-[480px] min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-white px-6 text-sm leading-normal font-bold tracking-[0.015em] transition-colors hover:bg-gray-100 @[480px]:h-12 @[480px]:px-5 @[480px]:text-base"
            >
              <span className="truncate">Try the Demo</span>
            </Link>
          </div>
        </div>


        {/* Feature Section */}
        <div className="@container flex flex-col gap-10 px-6 py-10">
          <div className="flex flex-col gap-4">
            <h1 className="max-w-[720px] text-[32px] leading-tight font-bold tracking-tight text-gray-900 @[480px]:text-4xl @[480px]:font-black">
              Everything you need to create the perfect onboarding experience.
            </h1>
            <p className="max-w-[720px] text-base leading-normal font-normal text-gray-600">
              Powerful features designed for simplicity and scale.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-1 flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <Icon className="text-primary text-3xl" />

                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg leading-tight font-bold text-gray-900">
                      {feature.title}
                    </h2>
                    <p className="leading-normal font-normal text-gray-600">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How it Works Section */}
        <div className="bg-white px-6 py-10">
          <h2 className="pb-8 text-center text-[22px] leading-tight font-bold tracking-[-0.015em] text-gray-900">
            How it Works
          </h2>
          <div className="mx-auto max-w-2xl flex flex-col gap-8">
            {steps.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="bg-primary/20 text-primary flex size-10 shrink-0 items-center justify-center rounded-full font-bold">
                  {item.step}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="p-6">
          <div className="bg-primary shadow-primary/20 flex flex-col items-center gap-6 rounded-xl p-8 text-center text-white shadow-lg">
            <h2 className="text-2xl leading-tight font-bold">
              Ready to improve your user experience?
            </h2>
            <p className="text-white/80">
              Start building better onboarding flows today. No credit card
              required.
            </p>
            <Link
              href="/auth"
              className="text-primary flex h-12 w-full max-w-sm min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-white px-5 text-base leading-normal font-bold tracking-[0.015em] transition-colors hover:bg-gray-100"
            >
              <span className="truncate">Get Started for Free</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
