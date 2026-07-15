import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | William Tai",
  description: "Get in touch with William Tai, Full-Stack & AI-Native Developer. Send a message directly through the contact form.",
};

export default function ContactPage() {
  return (
    <main className="max-w-xl mx-auto px-6 py-12 md:py-20 font-body min-h-screen flex flex-col justify-center">
      {/* Navigation / Back Button */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-text-muted hover:text-mint-patina transition-colors group"
        >
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          BACK TO PORTFOLIO
        </Link>
      </div>

      {/* Page Header */}
      <header className="mb-10">
        <h1 className="text-headline font-light font-display text-text-primary mb-3">
          Get in Touch
        </h1>
        <p className="text-text-muted text-sm leading-relaxed font-light">
          Have a project in mind, a job opportunity, or just want to connect? Fill out the form below, and I will get back to you as soon as possible.
        </p>
      </header>

      {/* Hardened Contact Form Component */}
      <section className="p-6 md:p-8 rounded-sm bg-obsidian-raised border border-border-subtle">
        <ContactForm />
      </section>
    </main>
  );
}
