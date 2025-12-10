import React from "react";
import Link from "next/link";
import { MdOutlineEmojiObjects, MdOutlineWidgets } from "react-icons/md";
import { benefits } from "@/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const cardClass =
  "bg-background flex flex-1 flex-col gap-3 rounded-xl border border-gray-200 p-4";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-background relative container mx-auto flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />

      <main className="mx-auto w-full flex-1 px-6 py-6">
        {/* Title & subtitle */}
        <h1 className="mb-2 text-3xl leading-tight font-tay-bea text-gray-900">
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
            <MdOutlineWidgets className="text-purple text-3xl" />
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-tay-bea text-gray-900">What We Do</h2>
              <p className="text-sm text-gray-600">
                We provide an embeddable tool for creating intuitive user tours
                and guides.
              </p>
            </div>
          </div>

          <div className={cardClass}>
            <MdOutlineEmojiObjects className="text-purple text-3xl" />
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-tay-bea text-gray-900">Our Mission</h2>
              <p className="text-sm text-gray-600">
                To empower developers to create exceptional user experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Key benefits */}
        <section className="bg-background mb-6 rounded-xl border border-gray-200 p-5">
          <h3 className="mb-4 text-xl font-tay-bea text-gray-900">Key Benefits</h3>

          <ul className="space-y-3">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <li key={idx} className="flex items-center gap-3">
                  <div className="bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full">
                    <Icon className="text-purple text-lg" />
                  </div>
                  <span className="text-gray-700">{benefit.text}</span>
                </li>
              );
            })}
          </ul>
        </section>

        
      </main>

      <ContactSection />
    </div>
  );
};

export default AboutPage;
