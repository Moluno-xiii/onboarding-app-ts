import React from "react";
import Link from "next/link";
import {
  MdOutlineEmojiObjects,
  MdOutlineHub,
  MdOutlineWidgets,
} from "react-icons/md";
import { benefits } from "@/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const cardClass =
  "bg-background flex flex-1 flex-col gap-3 rounded-xl border border-gray-200 p-4";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-background relative container mx-auto flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />

      <main className="mx-auto w-full flex-1 px-6 py-6">
        {/* Hero / Banner */}
        <div className="relative mb-6 min-h-[218px] overflow-hidden rounded-xl">
          <div className="bg-yellow absolute inset-0 bg-linear-to-br  opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <MdOutlineHub className="text-8xl text-white opacity-30" />
          </div>
        </div>

        {/* Title & subtitle */}
        <h1 className="mb-2 text-3xl leading-tight font-bold text-gray-900">
          Effortless Onboarding for Your Users
        </h1>
        <p className="mb-6 text-base text-gray-700">
          Our product is a powerful, embeddable tool that allows you to create
          seamless user tours and interactive guides directly within your
          application.
        </p>

        {/* Feature cards (2-column responsive) */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className={cardClass}>
            <MdOutlineWidgets className="text-primary text-3xl" />
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-bold text-gray-900">What We Do</h2>
              <p className="text-sm text-gray-600">
                We provide an embeddable tool for creating intuitive user tours
                and guides.
              </p>
            </div>
          </div>

          <div className={cardClass}>
            <MdOutlineEmojiObjects className="text-primary text-3xl" />
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-bold text-gray-900">Our Mission</h2>
              <p className="text-sm text-gray-600">
                To empower developers to create exceptional user experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Key benefits */}
        <section className="bg-background mb-6 rounded-xl border border-gray-200 p-5">
          <h3 className="mb-4 text-xl font-bold text-gray-900">Key Benefits</h3>

          <ul className="space-y-3">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <li key={idx} className="flex items-center gap-3">
                  <div className="bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full">
                    <Icon className="text-primary text-lg" />
                  </div>
                  <span className="text-gray-700">{benefit.text}</span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* CTA */}
        <div className="mb-6">
          <Link
            href="/signup"
            className="bg-yellow hover:bg-light-black mx-auto flex w-full max-w-md items-center justify-center rounded-xl px-6 py-4 text-base font-bold text-white transition-colors"
          >
            Get Started
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
