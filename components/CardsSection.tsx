"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useState, useEffect } from "react";
import Card from "./Card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const CARDS = [
  {
    title: (
      <>
        Add Onboardify
        <br />
        to your product
      </>
    ),
    description:
      "Drop in a small script or SDK and you're ready to start building guided experiences.",
    icon: "/flagIcon.webp",
    borderColor: "#eda81f",
  },
  {
    title: "Create steps in minutes",
    description:
      "Use our editor to highlight features, show tooltips, and walk users through key actions.",
    icon: "/bolt.webp",
    borderColor: "#a399f2",
  },
  {
    title: "Track user progress",
    description:
      "See where people click, stop, or finish so you can improve the journey.",
    icon: "/heart.webp",
    borderColor: "#f26555",
  },
  {
    title: "Launch interactive tours",
    description:
      "Publish your flow and guide users instantly—no engineering tickets needed.",
    icon: "/star.webp",
    borderColor: "#eda81f",
  },
];

export default function CardsSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const childrenRef = useRef<HTMLDivElement[]>([]);
  const [active, setActive] = useState(0);
  const rafRef = useRef<number | null>(null);
  const mainRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".card");
      const total = cards.length;
      const scrollDistance = 200; // distance per card

      // Set initial positions - stack cards with slight offset
      cards.forEach((card, i) => {
        const initialY = i * 20; // stack offset

        gsap.set(card, {
          y: initialY,
          opacity: 1,
        });

        // Animate each card leaving upward sequentially
        gsap.to(card, {
          y: initialY - window.innerHeight, // move upward beyond view from its initial position

          ease: "power2.inOut",
          scrollTrigger: {
            trigger: mainRef.current,
            start: `top+=${i * scrollDistance} top`,
            end: `top+=${(i + 1) * scrollDistance} top`,
            scrub: true,
          },
        });
      });

      // Pin the section for the entire animation duration
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "top top",
        end: `+=${(total - 1.6) * scrollDistance}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
      });
    },
    { scope: mainRef },
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const containerCenter = el.scrollLeft + el.clientWidth / 2;
        let closest = 0;
        let minDiff = Infinity;
        childrenRef.current.forEach((child, i) => {
          if (!child) return;
          const childCenter = child.offsetLeft + child.clientWidth / 2;
          const diff = Math.abs(childCenter - containerCenter);
          if (diff < minDiff) {
            minDiff = diff;
            closest = i;
          }
        });
        setActive((prev) => (prev === closest ? prev : closest));
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      el.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    const child = childrenRef.current[index];
    if (!el || !child) return;
    const left = child.offsetLeft - (el.clientWidth - child.clientWidth) / 2;
    el.scrollTo({ left, behavior: "smooth" });
    setActive(index);
  };

  const goToNext = () => {
    const next = active + 1 >= CARDS.length ? 0 : active + 1;
    scrollToIndex(next);
  };

  const goToPrev = () => {
    const prev = active - 1 < 0 ? CARDS.length - 1 : active - 1;
    scrollToIndex(prev);
  };

  return (
    <section
      className="relative mt-30 lg:h-screen lg:items-center lg:justify-center"
      ref={mainRef}
    >
      <div className="mx-auto max-w-7xl text-center">
        {/* Carousel (small→md) */}
        <p className="font-tay-bea text-light-black top-10 mb-4 block text-center text-sm font-bold tracking-widest uppercase lg:hidden">
          Features
        </p>
        <div className="my-8 flex items-center justify-center gap-3 lg:hidden">
          <div
            ref={scrollRef}
            className="no-scrollbar mx-auto flex w-full max-w-4xl snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth"
          >
            {CARDS.map((c, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) childrenRef.current[i] = el;
                }}
                className="w-full shrink-0 snap-center sm:w-[65%] md:w-[48%]"
              >
                <Card
                  title={c.title}
                  description={c.description}
                  icon={c.icon}
                  borderColor={c.borderColor}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator (visible on carousel breakpoints) */}
        <div
          className="mt-12 flex justify-between gap-2 lg:hidden"
          aria-label="carousel navigation"
        >
          <button
            aria-label="Previous"
            onClick={goToPrev}
            className="bg-light-brown-gray active:bg-light-brown-gray/50 flex size-16 items-center justify-center rounded-full p-2 shadow"
          >
            <FaChevronLeft className="text-xl" />
          </button>
          <div className="flex items-center gap-2">
            {CARDS.map((_, i) => (
              <button
                key={i}
                aria-selected={active === i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`size-2 rounded-full transition-all ${active === i ? "size-2 bg-black opacity-100" : "size-2 bg-black/30 opacity-70"}`}
              />
            ))}
          </div>
          <button
            aria-label="Next"
            onClick={goToNext}
            className="bg-light-brown-gray active:bg-light-brown-gray/50 flex size-16 items-center justify-center rounded-full p-2 shadow"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>

        {/* Grid / wrapped layout for lg+ */}

        <div className="hidden h-screen lg:mt-12 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-6">
          <p className="font-tay-bea text-light-black absolute top-10 mb-4 block text-center text-sm font-bold tracking-widest uppercase">
            Features
          </p>

          {CARDS.map((c, i) => (
            <div
              key={i}
              className="card absolute"
              style={{ zIndex: CARDS.length - i }}
            >
              <Card
                title={c.title}
                description={c.description}
                icon={c.icon}
                borderColor={c.borderColor}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
