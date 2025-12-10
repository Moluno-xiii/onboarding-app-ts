import Link from "next/link";
import React from "react";
import { features, steps } from "@/data";
import Image from "next/image";

export default function Hero() {
  const cardClass =
    "flex flex-1 flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md";
  return (
    <div className="w-full py-10">
      {/* Hero */}
      <section className="mb-10 min-h-100 items-center justify-center gap-6 overflow-hidden rounded-xl lg:py-6">
        <div className="justify-center sm:flex sm:flex-row">
          <div className="relative mt-3 -mb-10 flex flex-col text-5xl max-sm:justify-center max-sm:text-center sm:order-2 sm:text-6xl lg:flex lg:text-8xl">
            <div className="mx-auto flex justify-center max-sm:translate-y-7 max-sm:-rotate-10 sm:-translate-x-30">
              <span className="font-tay-bea"> Onboard</span>
              <Image
                src={
                  "https://cdn.prod.website-files.com/67079a31e71560a787d9fcc4/671f8d4e6862fc4943cefbc8_Static-6-yellow.gif"
                }
                alt="happy guy"
                width={70}
                height={70}
                unoptimized
                className="-right-20 self-start sm:absolute sm:w-[80] sm:-translate-y-5"
              />
            </div>
            <div className="font-tay-bea max-sm:translate-x-16">Users</div>

            <div className="flex max-sm:-translate-y-1 max-sm:rotate-10 max-sm:justify-center">
              <Image
                src={
                  "https://cdn.prod.website-files.com/67079a31e71560a787d9fcc4/671f8d4e6862fc4943cefbc8_Static-6-yellow.gif"
                }
                alt="happy guy"
                width={70}
                height={70}
                unoptimized
                className="rotate-180 self-start sm:hidden lg:bottom-3 lg:-left-28"
              />
              <span className="font-tay-bea"> Effortlessly</span>
            </div>

            <div className="max-sm:hidden max-sm:items-center max-sm:justify-center max-sm:text-center sm:order-3">
              <h2 className="max-w-md text-base leading-normal font-semibold max-sm:mx-auto max-sm:text-center">
                Guide your users with interactive tours and tooltips, embedded
                in minutes.
              </h2>
              <div className="flex flex-wrap gap-2 py-4 max-sm:justify-center">
                <Link
                  href="/"
                  className="bg-yellow/80 z-10 flex h-10 max-w-120 min-w-38 items-center justify-center rounded-full px-8 text-sm font-bold text-white transition-colors hover:bg-light-black @[30rem]:h-12 @[30rem]:px-5 @[30rem]:text-base"
                >
                  <span className="truncate">Try Demo</span>
                </Link>
                <Link
                  href="/docs"
                  className="border-light-brown z-10 flex h-10 max-w-120 min-w-38 items-center justify-center rounded-full border px-8 text-sm font-bold transition-colors hover:bg-gray-100 @[30rem]:h-12 @[30rem]:px-5 @[30rem]:text-base"
                >
                  <span className="truncate">Docs</span>
                </Link>
              </div>
            </div>
          </div>
          <Image
            src={
              "https://cdn.prod.website-files.com/67079a31e71560a787d9fcc4/6720fb304fc9e5207aa650cd_01_work-call-1600px-transparent.gif"
            }
            alt="happy guy"
            className="w-[300] max-sm:mx-auto sm:order-1 sm:w-[300] lg:w-[550]"
            width={600}
            height={600}
            unoptimized
          />
        </div>

        <div className="items-center justify-center text-center sm:order-3 sm:hidden lg:-ml-10">
          <h1 className="text-4xl leading-tight font-black tracking-[-0.033em] @[30rem]:text-5xl"></h1>
          <h2 className="mx-auto max-w-md text-center text-base leading-normal font-semibold">
            Guide your users with interactive tours and tooltips, embedded in
            minutes.
          </h2>
          <div className="flex flex-wrap justify-center gap-2 py-4">
            <Link
              href="/"
              className="bg-yellow/80 flex h-10 max-w-120 min-w-38 items-center justify-center rounded-full px-8 text-sm font-bold text-white transition-colors hover:bg-gray-100"
            >
              <span className="truncate">Learn more</span>
            </Link>
            <Link
              href="/"
              className="border-light-brown z-10 flex h-10 max-w-120 min-w-38 items-center justify-center rounded-full border px-8 text-sm font-bold transition-colors hover:bg-gray-100 @[30rem]:h-12 @[30rem]:px-5 @[30rem]:text-base"
            >
              <span className="truncate">Docs</span>
            </Link>
          </div>
        </div>
      </section>
      {/* Feature Section */}
      {/* <section className="mb-12 flex flex-col gap-6">
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
      </section> */}
      {/* How it Works */}
      {/* <section className="mb-12 rounded-xl bg-white px-6 py-10">
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
      </section> */}
      {/* Final CTA */}
      {/* <section className="mb-12">
        <div className="bg-primary shadow-primary/20 flex flex-col items-center gap-6 rounded-xl p-8 text-center text-white shadow-lg">
          <h3 className="text-2xl font-bold">
            Ready to improve your user experience?
          </h3>
          <p className="text-white/80">
            Start building better onboarding flows today. No credit card
            required.
          </p>

          <Link
            href="/auth"
            className="text-primary w-full max-w-sm rounded-lg bg-white px-5 py-3 text-center font-bold transition-colors hover:bg-gray-100"
          >
            Get Started for Free
          </Link>
        </div>
      </section> */}
    </div>
  );
}
