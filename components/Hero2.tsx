"use client";
import React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Hero2() {
  const mainRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "-400px top",
          end: "+=500",
          scrub: 1,
        },
      });

      tl.to(".guide", { opacity: 1, ease: "power2.out", duration: 0.5 });
      tl.to(".made", {
        opacity: 1,
        ease: "power2.out",
        duration: 0.5,
      });
      tl.to(".simple", {
        opacity: 1,
        ease: "power2.out",
        duration: 0.5,
      });
      tl.to(".us", {
        opacity: 1,
        ease: "power2.out",
      });

      gsap.to(".box", { x: 360 });
    },
    { scope: mainRef },
  );
  return (
    <div
      ref={mainRef}
      className="hero2 flex  h-[50vh] md:h-screen flex-1 items-center justify-center"
    >
      {/* <p className="box">box Guidance made simple.</p> */}
      <div className="font-tay-bea flex flex-col text-4xl sm:text-7xl lg:text-8xl">
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
          className="made flex translate-x-20 rotate-3 gap-2 sm:translate-x-60"
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
    </div>
  );
}
