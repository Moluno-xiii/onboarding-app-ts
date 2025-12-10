"use client";
import React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GuideNote2 from "./GuideNote2";
import HowItWorksSection from "./HowItWorksSection.tsx";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Hero2() {
  const mainRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "+=1500",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(".guide", { opacity: 1, ease: "power2.out", duration: 0.5 });
      tl.to(".made", { opacity: 1, ease: "power2.out", duration: 0.5 });
      tl.to(".simple", { opacity: 1, ease: "power2.out", duration: 0.5 });
      tl.to(".us", { opacity: 1, ease: "power2.out", duration: 1.5 });
      tl.from(".second", { yPercent: 100, ease: "none", duration: 6 });

      tl.to(
        ".first",
        { opacity: 0, ease: "power2.out", duration: 0.1 },
        "-=0.2",
      );
      tl.to(
        ".note2",
        { opacity: 1, ease: "power2.out", duration: 0.1 },
        "-=0.1",
      );

      tl.to(".second", { yPercent: -100, ease: "none", duration: 6 });
    },
    { scope: mainRef },
  );

  return (
    <div
      ref={mainRef}
      className="hero2 relative flex h-screen flex-1 flex-col items-center justify-center"
    >
      <div className="font-tay-bea first flex h-screen flex-col items-center justify-center text-4xl sm:text-7xl lg:text-8xl">
        <div style={{ opacity: 0 }} className="guide flex -rotate-12">
          <Image
            src={
              "https://cdn.prod.website-files.com/67079a31e71560a787d9fcc4/671f8d4f416c08af9ec75729_Static-3-red.gif"
            }
            alt="string"
            className="w-[40] sm:w-[60] lg:w-[120]"
            width={100}
            height={100}
            unoptimized
          />
          <span>GUIDANCE</span>
          <Image
            src={
              "https://cdn.prod.website-files.com/67079a31e71560a787d9fcc4/671f8d4e8ccdbf0c35c33483_Static-1-purple.gif"
            }
            alt="string"
            className="w-[40] sm:w-[60] lg:w-[120]"
            width={100}
            height={100}
            unoptimized
          />
        </div>
        <div
          style={{ opacity: 0 }}
          className="made flex translate-x-1 rotate-3 gap-2"
        >
          <Image
            src={
              "https://cdn.prod.website-files.com/67079a31e71560a787d9fcc4/671f8d4e3a8669f69f00d343_Static-5-yellow.gif"
            }
            alt="string"
            className="w-[40] translate-y-2 rotate-100 sm:w-[60] lg:w-[120]"
            width={100}
            height={100}
            unoptimized
          />
          <span>MADE</span>
        </div>
        <div className="simple rotate-5" style={{ opacity: 0 }}>
          SIMPLE WITH
        </div>
        <div className="us -rotate-5 text-center" style={{ opacity: 0 }}>
          US
        </div>
      </div>

      <div
        style={{ zIndex: 10 }}
        className="second absolute z-10 w-full translate-y-28 rounded-4xl"
      >
        <HowItWorksSection />
      </div>

      <section
        style={{ opacity: 0, zIndex: 0 }}
        className="note2 font-tay-bea absolute w-full  px-4 pt-20 text-5xl leading-[0.9] sm:py-32 sm:text-6xl lg:text-8xl"
      >
        <div className=" mx-auto">
          <GuideNote2 />
        </div>
      </section>
    </div>
  );
}
