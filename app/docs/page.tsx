"use client";

import Link from "next/link";
import { useState } from "react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { MdKey, MdArticle, MdInfo, MdPlayCircle } from "react-icons/md";
import { CodeBlock } from "@/components/CodeBlock";

const InstallGuide: React.FC = () => {
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);

  const safeCopy = async (text: string, setCopied: (v: boolean) => void) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const blob = new Blob([text], { type: "text/plain" });
        const clipboardItem = new ClipboardItem({ "text/plain": blob });
        await navigator.clipboard.write([clipboardItem]);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const scriptTag = `<script
  async
  src="https://cdn.yourservice.com/tour.js"
></script>`;

  const initCode = `<script>
  window.YourTour.init({
    apiKey: 'YOUR_API_KEY',
    tourId: 'YOUR_TOUR_ID',
    userId: 'current_user_id'
  });
</script>`;

  return (
    <div className="bg-background-light flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-8">
        <h2 className="mb-3 text-3xl leading-tight font-bold text-gray-900">
          Installation Guide — Embed Your Tour
        </h2>
        <p className="mb-6 text-base leading-relaxed text-gray-600">
          This guide will walk you through the steps to embed the tour script
          into your website in minutes.
        </p>

        <h3 className="mb-3 pt-5 text-xl font-bold text-gray-900">
          Prerequisites
        </h3>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
            <div className="bg-primary/20 text-primary flex size-10 items-center justify-center rounded-lg">
              <MdKey className="text-xl" />
            </div>
            <p className="flex-1 truncate font-medium text-gray-800">
              Your unique API key
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
            <div className="bg-primary/20 text-primary flex size-10 items-center justify-center rounded-lg">
              <MdArticle className="text-xl" />
            </div>
            <p className="flex-1 truncate font-medium text-gray-800">
              Access to your website&apos;s HTML
            </p>
          </div>
        </div>

        <h3 className="mb-3 pt-8 text-xl font-bold text-gray-900">
          1. Add the Script Tag
        </h3>
        <p className="mb-4 text-gray-600">
          Place the following script tag just before the closing{" "}
          <code>&lt;/body&gt;</code> tag.
        </p>

        <CodeBlock
          value={scriptTag}
          copied={copied1}
          onCopy={() => safeCopy(scriptTag, setCopied1)}
        />

        <h3 className="mb-3 pt-8 text-lg font-bold text-gray-900">
          2. Initialize the Tour
        </h3>
        <p className="mb-4 text-gray-600">
          Add this script to initialize the tour with your API key.
        </p>

        <CodeBlock
          value={initCode}
          copied={copied2}
          onCopy={() => safeCopy(initCode, setCopied2)}
        />

        <div className="bg-primary/10 mt-6 flex items-start gap-4 rounded-xl p-4">
          <MdInfo className="text-primary mt-1 text-xl" />
          <p className="text-primary/90 text-sm leading-relaxed">
            <strong className="text-primary font-semibold">Important:</strong>{" "}
            Replace <code>YOUR_API_KEY</code> with your actual credentials.
          </p>
        </div>

        <h3 className="mt-10 mb-3 text-lg font-bold text-gray-900">
          Need Help?
        </h3>
        <p className="mb-6 text-gray-600">
          Check out our live demo or contact our support team.
        </p>

        <Link
          href="/"
          className="bg-primary shadow-primary/30 hover:bg-primary-dark flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-bold text-white shadow-lg transition-transform active:scale-95"
        >
          <MdPlayCircle className="text-xl" />
          View a Live Demo
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default InstallGuide;
