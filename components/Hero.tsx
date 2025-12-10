import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="w-full py-10" style={{ zIndex: 12 }}>
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
                  className="bg-yellow/80 hover:bg-light-black z-10 flex h-10 max-w-120 min-w-38 items-center justify-center rounded-full px-8 text-sm font-bold text-white transition-colors @[30rem]:h-12 @[30rem]:px-5 @[30rem]:text-base"
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
    </div>
  );
}
