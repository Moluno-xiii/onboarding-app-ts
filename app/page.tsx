"use client";
import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import Hero2 from "@/components/Hero2";
import ContactSection from "@/components/ContactSection";
import FeaturesSection from "@/components/FeaturesSection";
import Script from "next/script";
import { useEffect } from "react";
import { Step, TourScript } from "./_components/TourScript";

const LandingPage: React.FC = () => {
  //   useEffect(() => {
  //   const s = document.createElement("script");
  //   s.src = "https://tours-embed-widget-vite.vercel.app/main.iife.js";
  //   s.dataset.id = "1041087b-f714-45fc-9b9f-dc308f88b9ab";
  //   s.async = false; // keep predictable execution order if needed
  //   s.onload = () => console.log("tour script loaded (native script)");
  //   s.onerror = (e) => console.error("tour script failed to load", e);
  //   document.body.appendChild(s);
  //   return () => s.remove();
  // }, []);

  const tourSteps: Step[] = [
    {
      target: "#guide",
      title: "👋 Welcome!",
      content: "Welcome to the tour! You can try this out on your application!",
      placement: "left",
    },
    {
      target: "#get-started",
      title: "Authentication",
      content: "Click this button to sign up to the website.",
      placement: "right",
    },
    {
      target: "#logo",
      title: "Here's home",
      content:
        "This takes you back home where you can see all your important info.",
      placement: "bottom",
    },
    {
      target: "#docs",
      title: "Docs",
      content: "This is where you can access and manage your docs.",
      placement: "left",
    },
    {
      target: "#about-us",
      title: "Ready to Go",
      content:
        "You’re all set! We built this app to make things smoother and take stress off your plate",
      placement: "top",
    },
  ];

  return (
    <div className="bg-bg-color relative mx-auto flex min-h-screen w-full flex-col overflow-x-hidden">
      <TourScript
        steps={tourSteps}
        onComplete={() => console.log("Completed")}
      />
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
