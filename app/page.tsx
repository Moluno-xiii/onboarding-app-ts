import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Hero from "@/components/Hero";
import Hero2 from "@/components/Hero2";
import Link from "next/link";
import { features, steps } from "@/data";

const cardClass =
  "flex flex-1 flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md";
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
        <div className="w-full px-6 py-10">
          {/* Hero */}
          <section className="relative mb-10 flex min-h-100 flex-col items-center justify-center gap-6 overflow-hidden rounded-xl bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5)),url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] bg-cover bg-center p-6 sm:gap-8">
            <div className="bg-primary/20 absolute inset-0 mix-blend-overlay" />
            <div className="z-10 flex flex-col gap-2 text-center">
              <h1 className="text-4xl leading-tight font-black tracking-[-0.033em] text-white @[30rem]:text-5xl">
                Effortless User Onboarding
              </h1>
              <h2 className="mx-auto max-w-md text-sm leading-normal font-normal text-white/90 @[30rem]:text-base">
                Guide your users with interactive tours and tooltips, embedded
                in minutes.
              </h2>
            </div>

            <Link
              href="/"
              className="z-10 flex h-10 max-w-120 min-w-21 items-center justify-center rounded-lg bg-white px-6 text-sm font-bold transition-colors hover:bg-gray-100 @[30rem]:h-12 @[30rem]:px-5 @[30rem]:text-base"
            >
              <span className="truncate">Try the Demo</span>
            </Link>
          </section>

          {/* Feature Section */}
          <section className="mb-12 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="max-w-180 text-3xl leading-tight font-bold text-gray-900 @[30rem]:text-4xl">
                Everything you need to create the perfect onboarding experience.
              </h2>
              <p className="max-w-180 text-base text-gray-600">
                Powerful features designed for simplicity and scale.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className={cardClass}>
                    <Icon className="text-primary text-3xl" />
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* How it Works */}
          <section className="mb-12 rounded-xl bg-white px-6 py-10">
            <h3 className="mb-8 text-center text-xl font-bold text-gray-900">
              How it Works
            </h3>

            <div className="mx-auto flex max-w-2xl flex-col gap-8">
              {steps.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="bg-primary/20 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold">
                    {item.step}
                  </div>

                  <div className="flex flex-col gap-1">
                    <h4 className="text-lg font-bold text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="mb-12">
            <div className="bg-primary shadow-primary/20 flex flex-col items-center gap-6 rounded-xl p-8 text-center text-white shadow-lg">
              <h3 className="text-2xl font-bold">
                Ready to improve your user experience?
              </h3>
              <p className="text-white/80">
                Start building better onboarding flows today. No credit card
                required.
              </p>

              <Link
                href="/signup"
                className="text-primary w-full max-w-sm rounded-lg bg-white px-5 py-3 text-center font-bold transition-colors hover:bg-gray-100"
              >
                Get Started for Free
              </Link>
            </div>
          </section>
        </div>
        <Hero />
        <Hero2 />
        <CardsSection />
      </main>

      <ContactSection />
    </div>
  );
};

export default LandingPage;
