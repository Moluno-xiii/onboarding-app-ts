import Link from "next/link";
import { YellowSquiggle } from "./Shapes";

interface ContactSectionProps {
  email?: string;
}

export default function ContactSection({
}: ContactSectionProps) {
  return (
    <footer className="font-tay-bea flex min-h-[600px] w-full items-center justify-center overflow-hidden bg-text">
      <div className="relative container mx-auto w-full rounded-3xl bg-text">
        {/* Decorative Background Elements positioned relative to the container */}
        <div className="relative z-10 px-4 py-20 text-center sm:px-8 sm:py-24 lg:py-30">
          <div className="font-marker relative mx-auto flex max-w-4xl flex-col items-center justify-center leading-none tracking-tight text-white md:flex-row md:flex-wrap md:items-baseline md:gap-4">
            <div className="relative z-10">
              {/* Purple dashes decoration */}
              <div className="absolute -top-4 -left-16 h-20 w-20 -rotate-12 opacity-90 md:-top-2 md:-left-20 md:h-24 md:w-24">
                <img src="/purple-lines.gif" alt="red chip illustration" />
              </div>

              <span className="block origin-bottom-right -rotate-6 transform text-[60px] drop-shadow-2xl sm:text-[90px] md:text-[120px]">
                READY
              </span>
            </div>

            {/* -- TO -- */}
            <div className="relative z-20 mx-2 my-4 md:mx-4 md:my-0">
              {/* Yellow squiggle under 'TO' */}
              <div className="absolute -bottom-8 left-1/2 w-24 -translate-x-1/2 translate-y-2 md:w-32">
                <YellowSquiggle className="h-full w-full" />
              </div>
              <span className="relative block rotate-6 transform text-[50px] text-[#FFD24D] sm:text-[60px] md:text-[80px]">
                TO
              </span>
            </div>

            {/* -- CONNECT? -- */}
            <div className="relative z-10">
              {/* Top Right Red Chip */}
              <div className="absolute -top-16 -right-8 h-20 w-20 rotate-12 opacity-90 md:-top-24 md:-right-16 md:h-32 md:w-32">
                <img src="/red-chip-bottom.gif" alt="red chip illustration" />
              </div>

              <span className="block origin-bottom-left rotate-2 transform text-[60px] drop-shadow-2xl sm:text-[90px] md:text-[120px]">
                TRY OUT?
              </span>
            </div>
          </div>

          {/* Bottom Left Red Chip (Floating below text) */}
          <div className="absolute bottom-1/4 left-4 h-24 w-24 -rotate-200 opacity-90 md:left-20 md:h-32 md:w-32 lg:left-32">
            <img src="/red-chip-bottom.gif" alt="red chip illustration" />
          </div>

          {/* Connect Arrow & Email */}
          <div className="mt-16 flex flex-col items-center justify-center space-y-4">
            <div className="h-16 w-8 animate-bounce md:h-24 md:w-12">
              <img
                src="/connect.svg"
                alt="Connect illustration"
                className="h-full w-full"
              />
            </div>

            <Link
              href={"/dashboard"}
              className="group font-raleway relative inline-block text-lg font-medium tracking-wide text-white transition-colors hover:text-[#FFD24D] sm:text-xl md:text-2xl"
            >
              GET START
              {/* Simple underline animation */}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FFD24D] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
